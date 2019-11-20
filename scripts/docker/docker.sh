#!/bin/sh
set -e

IMAGE_NAME=${REGISTRY}/${REPOSITORY}:${DOCKER_TAG}

echo Building image ${IMAGE_NAME}
docker build --rm -t ${IMAGE_NAME} . || exit 2

echo Logging in to container registry ${REGISTRY} as ${USERNAME}
docker login ${REGISTRY} -u ${USERNAME} -p ${PASSWORD}

echo Pushing image ${IMAGE_NAME} to registry
docker push ${IMAGE_NAME}
