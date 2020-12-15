#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const github = require('./github');

const GH_OWNER = 'grafana';
const GH_REPO = 'grafana';
const ES_DIR_PATH = 'public/app/plugins/datasource/elasticsearch/';
const FRONTEND_DST_PATH = 'src';

async function main() {
  if (process.argv.length > 2) {
    if (process.argv[2] === '-h' || process.argv[2] === '--help') {
      printUsage();
      process.exit(0);
    }
  }

  console.log('Getting list of files to sync');
  const content = await listContent(ES_DIR_PATH);

  console.log('Downloading files');
  for (const file of content) {
    const destDir = `${FRONTEND_DST_PATH}/${file.relativePath ? file.relativePath + '/' : ''}`;
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    const dest = `${destDir}${file.name}`;
    await downloadFile(file.download_url, dest);
  }

  process.exit(0);
}

async function listContent(path) {
  const rawContent = await github.getRepoContent(GH_OWNER, GH_REPO, path);
  let content = [];
  for (const item of rawContent) {
    const { name, type, path: itemPath, download_url } = item;
    const relativePath = path.replace(ES_DIR_PATH, '');
    if (type === 'dir') {
      const dirContent = await listContent(itemPath);
      content = content.concat(dirContent);
    } else {
      content.push({ name, relativePath, download_url });
    }
  }
  return content;
}

async function downloadFile(url, destPath) {
  const file = fs.createWriteStream(destPath);
  const fileRequest = await https.get(url);
  await new Promise((resolve, reject) => {
    fileRequest.on('response', response => {
      response.pipe(file);
      file
        .on('finish', () => {
          file.close();
          resolve();
        })
        .on('error', err => {
          console.log(err.message);
        });
    });
  });
}

function printUsage() {
  const usage = `Sync changes with core Elasticsearch plugin.
This script uses GitHub API, in order to authenticate it, set GITHUB_API_TOKEN env variable to your personal access token.
New token can be generated at https://github.com/settings/tokens/new

Usage:
    ./sync-frontend.js [options]

Options:
      -v, --verbose: \t\t verbose output
  `;
  console.log(usage);
}

main().catch(console.error);
