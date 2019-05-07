const fetch = require('node-fetch');

export const versions = (async () => {
  try {
    const headers = {
      headers: { Accept: 'application/vnd.github.v3.raw' },
    };

    const response = await fetch(
      `https://api.github.com/repos/ApollosProject/apollos-prototype/contents/version.json`,
      headers,
    );

    const { previousVersion, newVersion } = await response.json();
    
    return { previousVersion, newVersion };
  } catch (e) {
    throw new Error(e)
  }
})();