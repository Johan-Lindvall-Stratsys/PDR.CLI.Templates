#!/bin/sh
mkdir audits

echo "Auditing root application..."
MSYS_NO_PATHCONV=1 docker run --rm -i \
  -v $(pwd)/:/app \
  -w /app \
  node:10.16.0-jessie \
  /bin/bash -c "yarn audit --json | grep auditAdvisory > audits/root.audit"

echo "Auditing frontend application..."
MSYS_NO_PATHCONV=1 docker run --rm -i \
  -v $(pwd)/:/app \
  -w /app \
  node:10.16.0-jessie \
  /bin/bash -c "yarn --cwd frontend audit --json | grep auditAdvisory > audits/frontend.audit"

echo "Auditing server application..."
MSYS_NO_PATHCONV=1 docker run --rm -i \
  -v $(pwd)/:/app \
  -w /app \
  node:10.16.0-jessie \
  /bin/bash -c "yarn --cwd server audit --json | grep auditAdvisory > audits/server.audit"

echo "Processing audit results..."
MSYS_NO_PATHCONV=1 docker run --rm -i \
  -v $(pwd)/:/app \
  -w /app \
  node:10.16.0-jessie \
  /bin/bash -c "node ./scripts/process-audit-logs.js"
