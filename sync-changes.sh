#!/bin/bash

BASE_COMMIT=$(cat .upstream.lock)

git checkout -B sync-upstream

echo "Creating new branch"
git checkout -B sync-upstream-${BASE_COMMIT}

echo "Syncing changes with base commit"
node ./scripts/sync-frontend.js -r ${BASE_COMMIT}
git add .
git commit -m "Sync changes with commit ${BASE_COMMIT}"

# echo "Rebasing changes"
# git rebase sync-upstream-${BASE_COMMIT} sync-upstream

echo "Syncing changes with master"
node ./scripts/sync-frontend.js

git add .
echo "Creating a patch"
git diff --cached > sync-patch-${BASE_COMMIT}.patch

echo "Cleaning up and applying patch"
git reset HEAD src/
git restore src/
git checkout sync-upstream
git apply --3way sync-patch-${BASE_COMMIT}.patch
git reset HEAD src/

echo "Patch applied. Now you can review changes and apply it manually if patch failed."
