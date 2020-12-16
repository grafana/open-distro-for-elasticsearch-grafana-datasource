#!/bin/bash

BASE_COMMIT=$(cat .upstream.lock)

git checkout -B sync-upstream
node ./scripts/sync-frontend.js
