#!/bin/sh
TIME_STAMP=$"`date "+%Y%m%d-%H%M"`"
echo '##vso[task.setvariable variable=TIME_STAMP]'${TIME_STAMP}

APPLICATION_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
echo '##vso[task.setvariable variable=APPLICATION_VERSION]'${APPLICATION_VERSION}

if [ "$RELEASE" = "true" ]; then
    echo '##vso[task.setvariable variable=DOCKER_TAG]'${APPLICATION_VERSION};
else
    echo '##vso[task.setvariable variable=DOCKER_TAG]'preview-${TIME_STAMP};
fi

echo '##vso[task.setvariable variable=REPOSITORY]##TAG_NAME##'

echo -e "@stratsys:registry=https://www.myget.org/F/stratsys-feed/npm/" >> ./.npmrc
echo -e "//www.myget.org/F/stratsys-feed/npm/:_authToken=${MYGET_API_KEY}" >> ./.npmrc
