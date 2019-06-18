const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const execa = require('execa');
const fetch = require('node-fetch');

const { getNewVersion } = require('./fetchUpdates');

const logger = { log: console.log, info: console.log, error: console.error, warn: console.warn, success: console.log() }

const apollosDiffUrl =
  'https://raw.githubusercontent.com/ApollosProject/apollos-upgrade/diffs/diffs';
const apollosFullDiffUrl =
  'https://github.com/ApollosProject/apollos-upgrade';


const getApollosConfig = () =>
  JSON.parse(fs.readFileSync('./apollos.json'));

const getProjectName = async () => {
  try {
    const { stdout: fileName } = await execa('find', ['./ios', '-name', '*.xcodeproj']);
    return fileName.match(/ios\/(.*)\.xcodeproj/)[1];
  } catch (e) {
    logger.error(e);
    logger.error('Could not read Xcode Project name. Please pass --projectName')
  }
}

const getPackageName = () => {
  const buildGradle = fs.readFileSync('./android/app/build.gradle', "utf8");
  const packageName = buildGradle.match(/applicationId "(.*)"/)[1]
  return packageName;
};

const cleanPatch = (patch, projectName, packageName) => {
  let patchWithRenamedProjects = patch;
  patchWithRenamedProjects = patchWithRenamedProjects
    .replace(
      new RegExp('com\\.apolloschurchapp', 'g'),
      packageName
    )
    .replace(
      new RegExp('com\\.apolloschurch\\.app', 'g'),
      packageName
    )
    .replace(
      new RegExp('com\\.apolloschurchapp'.split('.').join('/'), 'g'),
      packageName.split('.').join('/')
    ).replace(
      new RegExp('apolloschurchapp', 'g'),
      projectName
    );

  return patchWithRenamedProjects;
}

const getPatch = async (currentVersion, newVersion, platform, projectName, packageName) => {
  let patch;

  logger.info(`Fetching diff between v${currentVersion} and v${newVersion}...`);

  try {
    const patchResponse = await fetch(
      `${apollosDiffUrl}/${platform}/${currentVersion}..${newVersion}.diff`
    );
    patch = await patchResponse.text();
  } catch (error) {
    logger.error(
      `Failed to fetch diff for apollos ${newVersion}. Maybe it's not released yet?`
    );
    logger.info(
      'For available releases to diff see: https://github.com/ApollosProject/apollos-upgrade'
    );
    return null;
  }
  if (platform === 'client') {
    return cleanPatch(patch, projectName, packageName);
  }
  return patch;
};

const getFullDiff = async (currentVersion, newVersion, platform, projectName, packageName) => {
  let patch;

  logger.info(`Fetching diff between v${currentVersion} and v${newVersion}...`);

  try {
    const patchResponse = await fetch(
      `${apollosFullDiffUrl}/compare/release/${platform}/${currentVersion}...release/${platform}/${newVersion}.diff`
    );
    patch = await patchResponse.text();
  } catch (error) {
    logger.error(
      `Failed to fetch diff for apollos ${newVersion}. Maybe it's not released yet?`
    );
    logger.info(
      'For available releases to diff see: https://github.com/ApollosProject/apollos-upgrade'
    );
    return null;
  }

  return cleanPatch(patch, projectName, packageName);
};


const applyPatch = async (
  tmpPatchFile,
  tmpFullDiff
) => {
  let filesToExclude = ['package.json', '**/*.png', '**/*.otf', '**/*.webp', '**/*.ttf', '**/*.jar', '**/*.env.production'];
  let filesToFullDiff = [];

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
        '--binary',
        '--check',
        tmpPatchFile,
        ...excludes,
        '--3way',
        '-p2',
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
            x.replace(/^error: (.*): does not exist in index$/, '$1').replace(relativePathFromRoot, '')
          ),
      ].filter(Boolean);

      filesToFullDiff = [
        ...error.stderr
          .split('\n')
          .filter((x) => x.includes('patch does not apply'))
          .map((x) =>
            x.replace(/^error: (.*): patch does not apply$/, '$1').replace(relativePathFromRoot, '')
          ),
      ].filter(Boolean);


      filesToExclude = [
        ...filesToExclude,
        ...filesToFullDiff,
      ].filter(Boolean);

      logger.info(`Applying diff (excluding: ${filesToExclude.join(', ')})...`);
    } finally {
      const excludes = filesToExclude.map(
        (e) => `--exclude=${path.join(relativePathFromRoot, e)}`
      );

      const diffIncludes = filesToFullDiff.map(
        (e) => `--include=${path.join(relativePathFromRoot, e)}`
      );

      if (diffIncludes.length){
        try {
          logger.log(chalk.underline('Applying patch against full diff for the hard files. \n\nYou may need to consult the example apps for help merging these files'))
          logger.log(chalk.bgRed(filesToFullDiff.join('\n')))
          await execa('git', [
            'apply',
            tmpFullDiff,
            ...diffIncludes,
            '--3way',
            '-p2',
            `--directory=${relativePathFromRoot}`,
          ]);
        } catch (e) {

        }
      }

      await execa('git', [
        'apply',
        tmpPatchFile,
        ...excludes,
        '--3way',
        '-p2',
        `--directory=${relativePathFromRoot}`,
      ]);

    }
  } catch (error) {
    if (error.stderr) {
      logger.log(`${chalk.dim(error.stderr.trim())}`);
    }
    logger.error('Automatically applying diff failed');
    return false;
  }
  return true;
};

/**
 * Upgrade application to a new version of Apollos.
 */
async function upgrade({ to: toVersion, from: oldVersion, platform: platformArg, projectName: projectArg, packageName: packageArg }) {

  const config = getApollosConfig();

  const newVersion = toVersion || await getNewVersion();

  const fromVersion = oldVersion || config.version;
  const platform = platformArg || config.environment;

  const tmpPatchFile = `tmp-upgrade-apollos-${platform}.patch`;
  const tmpFullDiff = `tmp-full-diff-apollos-${platform}.patch`;

  const currentVersion = fromVersion;

  let packageName;
  let projectName;

  if (platform === 'client') {
    projectName = projectArg || await getProjectName();
    packageName = packageArg || await getPackageName();
  }

  const patch = await getPatch(currentVersion, newVersion, platform, projectName, packageName);
  const fullDiff = await getFullDiff(currentVersion, newVersion, platform, projectName, packageName);

  if (patch === null) {
    return;
  }

  if (patch === '') {
    logger.info('Diff has no changes to apply, proceeding further');
    logger.success(
      `Upgraded Apollo to v${newVersion} 🎉. Now you can review and commit the changes`
    );
    return;
  }
  let patchSuccess;

  try {
    fs.writeFileSync(tmpPatchFile, patch);
    fs.writeFileSync(tmpFullDiff, fullDiff);
    patchSuccess = await applyPatch(tmpPatchFile, tmpFullDiff);
  } catch (error) {
    throw new Error(error.stderr || error);
  } finally {
    try {
    fs.unlinkSync(tmpPatchFile);
    fs.unlinkSync(tmpFullDiff);
    } catch (e) {
      // ignore
    }
    const { stdout } = await execa('git', ['status', '-s']);
    if (!patchSuccess) {
      if (stdout) {
        logger.warn(
          'Continuing after failure. Most of the files are upgraded but you will need to deal with some conflicts manually'
        );
        logger.info('Running "git status" to check what changed...');
        await execa('git', ['status'], { stdio: 'inherit' });
      } else {
        logger.error(
          'Patch failed to apply for unknown reason. Please fall back to manual way of upgrading'
        );
      }
    } else {
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
• Comparison between versions: ${chalk.underline.dim(
        `${apollosDiffUrl}/compare/version/${currentVersion}..version/${newVersion}`
      )}
• Git diff: ${chalk.underline.dim(
        `${apollosDiffUrl}/compare/version/${currentVersion}..version/${newVersion}.diff`
      )}`);

      throw new Error(
        'Upgrade failed. Please see the messages above for details'
      );
    }
  }
  logger.success(
    `Upgraded Apollos to v${newVersion} 🎉. Now you can review and commit the changes`
  );
}

module.exports = upgrade;
