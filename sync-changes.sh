#!/bin/bash

BASE_COMMIT=$(cat .upstream.lock)

git checkout -B sync-upstream

echo "Creating new branch"
git checkout -B sync-upstream-${BASE_COMMIT}

echo "Syncing changes with base commit"
node ./scripts/sync-frontend.js -r ${BASE_COMMIT}
git add .
git commit -m "Sync changes with commit ${BASE_COMMIT}"

echo "Rebasing changes"
git rebase sync-upstream-${BASE_COMMIT} sync-upstream

echo "Syncing changes with master"
node ./scripts/sync-frontend.js

git add .
echo "Creating a patch"
git diff --cached > sync-patch-${BASE_COMMIT}.patch
