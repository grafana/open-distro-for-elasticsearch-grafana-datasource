const request = require('request-promise-native');
const { GITHUB_API_TOKEN } = process.env;

function apiRequest(endpoint) {
  const githubApiUrl = 'https://api.github.com';
  const url = `${githubApiUrl}${endpoint}`;
  const options = {
    uri: url,
    headers: {
      'User-Agent': 'NodeJS',
    },
    json: true,
  };
  if (GITHUB_API_TOKEN) {
    options.headers['Authorization'] = `token ${GITHUB_API_TOKEN}`;
  }
  return request(options);
}

async function getRepoContent(owner, repo, path) {
  const endpoint = `/repos/${owner}/${repo}/contents/${path || ''}`;
  const content = await apiRequest(endpoint);
  return content;
}

module.exports = {
  request: apiRequest,
  getRepoContent,
};
