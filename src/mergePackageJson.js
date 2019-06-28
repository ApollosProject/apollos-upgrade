const fetch = require('node-fetch');

const mergePackageJson = (ours, theirs) => {
  const newDeps = { ...ours.dependencies };
  const newDevDeps = { ...ours.devDependencies };

  Object.keys(theirs.dependencies).forEach((depKey) => {
    newDeps[depKey] = theirs.dependencies[depKey];
  })

  Object.keys(theirs.devDependencies).forEach((depKey) => {
    newDevDeps[depKey] = theirs.devDependencies[depKey];
  })

  return { ...ours, devDependencies: newDevDeps, dependencies: newDeps }
}

getRemotePackageJson = async ({ version, platform }) => {
  try {
    const headers = {
      headers: { Accept: 'application/vnd.github.v3.raw' },
    };

    const path = platform === 'client' ? 'apolloschurchapp' : 'apollos-church-api';
    const tag = `release/${platform}/${version}`

    const response = await fetch(
      `https://api.github.com/repos/ApollosProject/apollos-upgrade/contents/${path}/package.json?ref=${tag}`,
      headers,
    );

    const packageJson = await response.json();

    return packageJson;
  } catch (e) {
    throw new Error(e)
  }
};

module.exports.mergePackageJson = mergePackageJson;
module.exports.getRemotePackageJson = getRemotePackageJson;