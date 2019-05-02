const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const semver = require('semver');
const execa = require('execa');
const fetch = require('node-fetch');

const logger = { log: console.log, info: console.log, error: console.error, warn: console.warn}

const apollosDiffUrl =
  'https://github.com/ApollosProject/apollos-upgrade';

const getPatch = async (currentVersion, newVersion, platform, projectName, packageName) => {
  let patch;

  logger.info(`Fetching diff between v${currentVersion} and v${newVersion}...`);

  try {
    const patchResponse = await fetch(
      `${apollosDiffUrl}/compare/release/${platform}/${currentVersion}...release/${platform}/${newVersion}.diff`
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
};


const applyPatch = async (
  currentVersion,
  newVersion,
  tmpPatchFile,
) => {
  let filesToExclude = ['package.json', '**/*.png', '**/*.otf', '**/*.webp', '**/*.ttf', '**/*.jar', '**/*.env.production'];

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
        '--3way',
        '-p2',z
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
async function upgrade({ from: fromVersion, to: toVersion, platform, projectName, packageName }) {
  const tmpPatchFile = `tmp-upgrade-apollos-${platform}.patch`;
  const projectDir = '.';

  // todo, figure this out automatically
  const currentVersion = fromVersion || '0.8.0-alpha.4';
  const newVersion = toVersion || '0.8.1';


  const patch = await getPatch(currentVersion, newVersion, platform, projectName, packageName);

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
    patchSuccess = await applyPatch(currentVersion, newVersion, tmpPatchFile);
  } catch (error) {
    throw new Error(error.stderr || error);
  } finally {
    try {
      fs.unlinkSync(tmpPatchFile);
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
