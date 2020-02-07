const fetch = require('node-fetch');

module.exports.getNewVersion = async () => {
  try {
    const headers = {
      headers: { Accept: 'application/vnd.github.v3.raw' },
    };

    const response = await fetch(
      `https://api.github.com/repos/ApollosProject/apollos-apps/contents/lerna.json`,
      headers,
    );

    const { version } = await response.json();

    return version;
  } catch (e) {
    throw new Error(e)
  }
};