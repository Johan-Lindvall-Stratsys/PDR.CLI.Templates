#!/bin/sh
function cleanUp() {
    echo ""
  if [ $TEMP_CONTAINER ]; then
    echo "Removing regression test container."
    docker stop $TEMP_CONTAINER > /dev/null
  fi
}
trap cleanUp exit

echo "Creating docker container for regression tests."
TEMP_CONTAINER=$(docker run --rm -d \
  -v /$PWD/://app \
  -w //app \
  buildkite/puppeteer:v1.15.0 \
  sh -c "yarn azure:install && yarn frontend:run serve:regression") || exit $?

echo "Waiting for docker container to start..."

attempts=0
until $(docker exec $TEMP_CONTAINER curl --output /dev/null --silent --head --fail http://localhost:8080); do
  printf '.'
  sleep 1
  if [ $attempts -eq 30 ]; then
    echo ""
    echo "Server is not responding."
    exit 1
  fi
done
echo "Up and running!"

echo "Running regression tests."
docker exec \
  "$TEMP_CONTAINER" \
  sh -c "yarn frontend:run test:regression"
