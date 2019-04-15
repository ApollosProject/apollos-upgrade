const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const semver = require('semver');
const execa = require('execa');
const fetch = require('node-fetch');

const logger = { log: console.log, info: console.log, error: console.error, warn: console.warn}

const rnDiffPurgeUrl =
  'https://github.com/ApollosProject/apollos-upgrade';

const getPatch = async (currentVersion, newVersion, config) => {
  let patch;

  logger.info(`Fetching diff between v${currentVersion} and v${newVersion}...`);

  try {
    const patchResponse = await fetch(
      `${rnDiffPurgeUrl}/compare/release/${currentVersion}...release/${newVersion}.diff`
    );
    patch = await patchResponse.text();
  } catch (error) {
    logger.error(
      `Failed to fetch diff for react-native@${newVersion}. Maybe it's not released yet?`
    );
    logger.info(
      'For available releases to diff see: https://github.com/react-native-community/rn-diff-purge#version-changes'
    );
    return null;
  }

  let patchWithRenamedProjects = patch;

  Object.keys(config.project).forEach((platform) => {
    if (!config.project[platform]) {
      return;
    }
    if (platform === 'ios') {
      patchWithRenamedProjects = patchWithRenamedProjects.replace(
        new RegExp('RnDiffApp', 'g'),
        config.project[platform].projectName.replace('.xcodeproj', '')
      );
    } else if (platform === 'android') {
      patchWithRenamedProjects = patchWithRenamedProjects
        .replace(
          new RegExp('com\\.rndiffapp', 'g'),
          config.project[platform].packageName
        )
        .replace(
          new RegExp('com\\.rndiffapp'.split('.').join('/'), 'g'),
          config.project[platform].packageName.split('.').join('/')
        );
    } else {
      logger.warn(
        `Unsupported platform: "${platform}". \`upgrade\` only supports iOS and Android.`
      );
    }
  });

  return patchWithRenamedProjects;
};

const getVersionToUpgradeTo = async (argv, currentVersion, projectDir) => {
  const newVersion = argv[0]
    ? semver.valid(argv[0]) ||
      (semver.coerce(argv[0]) ? semver.coerce(argv[0]).version : null)
    : await getLatestRNVersion();

  if (!newVersion) {
    logger.error(
      `Provided version "${
        argv[0]
      }" is not allowed. Please pass a valid semver version`
    );
    return null;
  }

  if (currentVersion > newVersion) {
    logger.error(
      `Trying to upgrade from newer version "${currentVersion}" to older "${newVersion}"`
    );
    return null;
  }
  if (currentVersion === newVersion) {
    const {
      dependencies: { 'react-native': version },
    } = require(path.join(projectDir, 'package.json'));

    if (semver.satisfies(newVersion, version)) {
      logger.warn(
        `Specified version "${newVersion}" is already installed in node_modules and it satisfies "${version}" semver range. No need to upgrade`
      );
      return null;
    }
    logger.error(
      `Dependency mismatch. Specified version "${newVersion}" is already installed in node_modules and it doesn't satisfy "${version}" semver range of your "react-native" dependency. Please re-install your dependencies`
    );
    return null;
  }

  return newVersion;
};

const installDeps = async (newVersion, projectDir) => {
  // logger.info(
  //   `Installing "react-native@${newVersion}" and its peer dependencies...`
  // );
  // const peerDeps = await getRNPeerDeps(newVersion);
  // const deps = [
  //   `react-native@${newVersion}`,
  //   ...Object.keys(peerDeps).map((module) => `${module}@${peerDeps[module]}`),
  // ];
  // await PackageManager.install(deps, {
  //   silent: true,
  // });
  // await execa('git', ['add', 'package.json']);
  // try {
  //   await execa('git', ['add', 'yarn.lock']);
  // } catch (error) {
  //   // ignore
  // }
  // try {
  //   await execa('git', ['add', 'package-lock.json']);
  // } catch (error) {
  //   // ignore
  // }
};

const applyPatch = async (
  currentVersion,
  newVersion,
  tmpPatchFile,
) => {
  let filesToExclude = ['package.json'];

  const { stdout: relativePathFromRoot } = await execa('git', [
    'rev-parse',
    '--show-prefix',
  ]);
  try {
    try {
      const excludes = filesToExclude.map(
        (e) => `--exclude=${path.join(relativePathFromRoot, e)}`
      );
      await execa('git', [
        'apply',
        '--check',
        tmpPatchFile,
        ...excludes,
        '-p2',
        '--3way',
        `--directory=${relativePathFromRoot}`,
      ]);
      logger.info('Applying diff...');
    } catch (error) {
      filesToExclude = [
        ...filesToExclude,
        ...error.stderr
          .split('\n')
          .filter((x) => x.includes('does not exist in index'))
          .map((x) =>
            x.replace(/^error: (.*): does not exist in index$/, '$1')
          ),
      ].filter(Boolean);

      logger.info(`Applying diff (excluding: ${filesToExclude.join(', ')})...`);
    } finally {
      const excludes = filesToExclude.map(
        (e) => `--exclude=${path.join(relativePathFromRoot, e)}`
      );
      await execa('git', [
        'apply',
        tmpPatchFile,
        ...excludes,
        '-p2',
        '--3way',
        `--directory=${relativePathFromRoot}`,
      ]);
    }
  } catch (error) {
    console.log(error)
    if (error.stderr) {
      logger.log(`${chalk.dim(error.stderr.trim())}`);
    }
    logger.error('Automatically applying diff failed');
    return false;
  }
  return true;
};

/**
 * Upgrade application to a new version of React Native.
 */
async function upgrade() {
  const tmpPatchFile = 'tmp-upgrade-rn.patch';
  const projectDir = '.';

  const currentVersion = '0.8.0';
  const newVersion = '0.8.1';


  const patch = await getPatch(currentVersion, newVersion, { project: {}});

  if (patch === null) {
    return;
  }

  if (patch === '') {
    logger.info('Diff has no changes to apply, proceeding further');
    await installDeps(newVersion, projectDir);
    logger.success(
      `Upgraded Apollo to v${newVersion} 🎉. Now you can review and commit the changes`
    );
    return;
  }
  let patchSuccess;

  try {
    fs.writeFileSync(tmpPatchFile, patch);
    console.log(tmpPatchFile);
    patchSuccess = await applyPatch(currentVersion, newVersion, tmpPatchFile);
  } catch (error) {
    console.log(error, 'HERE PATCH ERROR');
    throw new Error(error.stderr || error);
  } finally {
    try {
      // fs.unlinkSync(tmpPatchFile);
    } catch (e) {
      // ignore
    }
    const { stdout } = await execa('git', ['status', '-s']);
    if (!patchSuccess) {
      if (stdout) {
        logger.warn(
          'Continuing after failure. Most of the files are upgraded but you will need to deal with some conflicts manually'
        );
        await installDeps(newVersion, projectDir);
        logger.info('Running "git status" to check what changed...');
        await execa('git', ['status'], { stdio: 'inherit' });
      } else {
        logger.error(
          'Patch failed to apply for unknown reason. Please fall back to manual way of upgrading'
        );
      }
    } else {
      await installDeps(newVersion, projectDir);
      logger.info('Running "git status" to check what changed...');
      await execa('git', ['status'], { stdio: 'inherit' });
    }
    if (!patchSuccess) {
      if (stdout) {
        logger.warn(
          'Please run "git diff" to review the conflicts and resolve them'
        );
      }
      logger.info(`You may find these resources helpful:
• Release notes: ${chalk.underline.dim(
        `https://github.com/facebook/react-native/releases/tag/v${newVersion}`
      )}
• Comparison between versions: ${chalk.underline.dim(
        `${rnDiffPurgeUrl}/compare/version/${currentVersion}..version/${newVersion}`
      )}
• Git diff: ${chalk.underline.dim(
        `${rnDiffPurgeUrl}/compare/version/${currentVersion}..version/${newVersion}.diff`
      )}`);

      throw new Error(
        'Upgrade failed. Please see the messages above for details'
      );
    }
  }
  logger.success(
    `Upgraded React Native to v${newVersion} 🎉. Now you can review and commit the changes`
  );
}
const upgradeCommand = {
  name: 'upgrade [version]',
  description:
    "Upgrade your app's template files to the specified or latest npm version using `rn-diff-purge` project. Only valid semver versions are allowed.",
  func: upgrade,
  options: [
    {
      command: '--legacy [boolean]',
      description:
        "Legacy implementation. Upgrade your app's template files to the latest version; run this after " +
        'updating the react-native version in your package.json and running npm install',
    },
  ],
};

module.exports = upgradeCommand;
