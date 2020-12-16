#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const github = require('./github');

const GH_OWNER = 'grafana';
const GH_REPO = 'grafana';
const ES_DIR_PATH = 'public/app/plugins/datasource/elasticsearch';
const FRONTEND_DST_PATH = 'src';
const COMMIT_LOCK_FILE = '.upstream.lock';

async function main() {
  let ref = 'master';
  let masterCommit;
  if (process.argv.length > 2) {
    if (process.argv[2] === '-h' || process.argv[2] === '--help') {
      printUsage();
      process.exit(0);
    } else if (process.argv[2] === '-r' || process.argv[2] === '--ref') {
      ref = process.argv[3];
    } else {
      ref = process.argv[2];
    }
  }

  if (ref === 'master') {
    const masterCommit = await github.getLastBranchCommit(GH_OWNER, GH_REPO, 'master');
    console.log('Master branch is on', masterCommit);
  }

  console.log(`Getting list of files to sync (ref ${ref})`);
  const content = await listContent(ES_DIR_PATH, ref);
  // console.log(content);

  console.log('Downloading files');
  for (const file of content) {
    const destDir = `${FRONTEND_DST_PATH}/${file.relativePath ? file.relativePath + '/' : ''}`;
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    const dest = `${destDir}${file.name}`;
    await downloadFile(file.download_url, dest);
  }

  if (ref === 'master' && masterCommit) {
    fs.writeFileSync(COMMIT_LOCK_FILE, masterCommit);
  }

  process.exit(0);
}

async function listContent(path, ref) {
  const rawContent = await github.getRepoContent(GH_OWNER, GH_REPO, path, ref);
  let content = [];
  for (const item of rawContent) {
    const { name, type, path: itemPath, download_url } = item;
    const relativePath = path.replace(ES_DIR_PATH, '');
    if (type === 'dir') {
      const dirContent = await listContent(itemPath, ref);
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
      -r, --ref <ref>: \t\t sync with particular commit or branch
      -v, --verbose: \t\t verbose output
  `;
  console.log(usage);
}

main().catch(console.error);
