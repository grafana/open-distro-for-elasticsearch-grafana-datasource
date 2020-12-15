#!/bin/bash

git checkout -b sync-upstream
node ./scripts/sync-frontend.js
