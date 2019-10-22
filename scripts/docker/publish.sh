#!/bin/sh
if [[ ! ${CURRENT_BRANCH} =~ refs/tags/(.+)$ ]]; then
    echo "Can only publish from tag commits, something is fishy..."
    exit 1
fi

MSYS_NO_PATHCONV=1 docker run --rm -i \
  -v $(pwd)/:/app \
  -w /app \
  node:10.16-jessie \
  /bin/bash -c "yarn run azure:publish"
