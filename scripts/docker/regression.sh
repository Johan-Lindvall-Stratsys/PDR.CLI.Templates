#!/bin/sh
function cleanUp() {
    echo ""
  if [ $TEMP_CONTAINER ]; then
    echo "Removing regression test container."
    docker stop $TEMP_CONTAINER > /dev/null
    docker rm $TEMP_CONTAINER > /dev/null
  fi
}
trap cleanUp exit

echo "Creating docker container for regression tests."
TEMP_CONTAINER=$(docker run -dit \
  -v /$PWD/://app \
  -w //app \
  -p 8080:8080 \
  buildkite/puppeteer:v1.15.0 \
  //bin/bash -c "yarn azure:install && yarn frontend:run serve:regression") || exit $?

echo "Wainting for docker container to start..."

attempts=0
until $(curl --output /dev/null --silent --head --fail http://localhost:8080); do
  printf '.'
  sleep 1
  if [ $attempts -eq 30 ]; then
    echo ""
    echo "Server is not responing."
    exit 1
  fi
done
echo "Up and running!"

echo "Running regression tests."
docker run --rm -i \
  -v /$PWD/://app \
  --network=host \
  -w //app \
  buildkite/puppeteer:v1.15.0 \
  //bin/bash -c "yarn frontend:run test:regression"
