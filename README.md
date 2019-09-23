# Welcome!

This is your newly created Stratsys flavoured microfrontend! It consists of a couple of things

* Yarn scripts
* Build and helper scripts
* Azure DevOps configuration
* VS Code configuration
* Docker configuration
* An express server
* A frontend application

The application is a collection of three node applications, the **root application** that handles the bundling and publication of the npm artifact and docker container. It also has a **frontend application** that is the main component of the package. The third component is an express **server application** that serves a build version of the frontend application.

# Scripts

In order to facilitate easier use the following scripts are available for use through `yarn run` without having to navigate through the different folders.

* `serve` - Builds and serves the frontend application through the corresponding frontend script
* `test`- Runs the unit test for the frontend application
* `lint`- Lint (and fix) the frontend application
* `build`- Runs a local build, mainly for testing and verification. The primary building procedure is done in a DevOps pipeline.
* `release`- Prompts you for a version and creates a release. This triggers the publication pipeline in DevOps.

There are a host of other scripts bunched into their primary use case.

## `frontend:`

All scripts with this prefix handle the frontend application.

* `frontend:add` - Adds a new dependency to the frontend application
* `frontend:build` - Builds the frontend application
* `frontend:run` - Runs a scripts from the `package.json` of the frontend.
* `frontend:install` - Install the frontend dependencies.

Their primary use is internal to the other scripts, however you can also use them. The best most common case is probably adding frontend dependencies
```
yarn frontend:add <some dependency>
```

## `server:`

These scripts handle the server application and are defined in the `package.json` at the root of the application.

* `server:install` - Install the server dependencies
* `server:run` - Run a scripts from the `package.json` of the server application
* `server:start` - Starts the server
* `server:build` - Builds the server

## `azure:`

Everything that is needed by the scripts that handle the azure pipelines have this prefix.
Apart from testing these scripts should not be run locally. They are not guaranteed to work on other environments.

`azure:audit` - Runs an audit on all the packages of each the applications
`azure:build` - Build all the artifacts in the appropriate way
`azure:publish` - Publish the build artifacts
`azure:install` - Install the dependencies of all applications
`azure:test` - Runs all tests

# Build and helper scripts

These scripts are located in the folder named `scripts`. They are further divided into two different kinds of scripts. The ones that are meant as helper scripts, called by `node ./scripts-name.js` in the commands defined in `package.json`. These are placed directly in scripts folder and are written in JS in order to be cross platform. This is a guarantee since Node is a requirement to run `yarn`.

The other type of script are docker build scripts and can be found in the `docker` sub-folder. These are bash scripts meant to be run in our azure environment and they call the yarn scripts through docker images to provided a normalized environment.

# Azure DevOps configuration

A recommended Azure DevOps pipeline configuration is provided can be found in the folder `azure`. It consist of two templates `build-steps.yml` and `report-steps.yml`. They are the shared steps of the two pipelines provided. The first one in the `ci-pipeline.yml` that runs on all PR's and on all commits to the master branch, it build a docker image each time but only as a preview. The other one is `publish-pipeline.yml`, and that one is triggered by tag commits (only). It also builds a docker image but with a proper version number. In addition to that it builds an npm package and publishes it to our MyGet feed.

# Docker configuration

A dockerfile is also included that defines how the docker image of the server should look. This automatically pushed to our docker registry on publish.

# VS Code configuration

A couple of VS Code settings that help with code completion, linting and other such goodies are provided in the `.vscode` folder.

# Express server

Serves a built version of the frontend application. Read more about this in the dedicated README if the server folder.

# Frontend application

The main focus for development. The details can vary depending on what type of frontend, check out the README in the frontend folder for specifics.
