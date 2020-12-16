#!/bin/bash

git checkout -B sync-upstream
node ./scripts/sync-frontend.js
