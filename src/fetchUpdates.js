const fetch = require('node-fetch');

(async () => {
  try {
    const headers = {
      headers: { Accept: 'application/vnd.github.v3.raw' },
    };

    const response = await fetch(
      `https://api.github.com/repos/ApollosProject/apollos-prototype/contents/version.json`,
      headers,
    );

    const { mostRecentVersion, newestVersion } = await response.json();
    
    return { mostRecentVersion, newestVersion };
  } catch (e) {
    throw new Error(e)
  }
})();