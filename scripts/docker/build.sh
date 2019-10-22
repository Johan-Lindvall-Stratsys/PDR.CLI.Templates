#!/bin/sh
set -e

MSYS_NO_PATHCONV=1 docker run --rm -i \
  -v $(pwd)/:/app \
  -w /app \
  node:10.16-jessie \
  /bin/bash -c "yarn run azure:install && yarn run azure:test && yarn run azure:build"


# Copy the source code so that the coverage reporter finds the files
# Can be ommited but the report will not be as fancy
# WARNING! ONLY DO THIS ON A BUILD AGENT THAT DOES NOT KEEP STATE
mkdir /app
mkdir /app/frontend
cp -r ./frontend/src /app/frontend/src
