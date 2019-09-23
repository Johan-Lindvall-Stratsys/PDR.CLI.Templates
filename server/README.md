Server
---

This express server provides a way to serve the application directly through a script tag. This means that any host (that has access to the server) can define the tag by including
```
<script src="https://##TAG_NAME##.stratsys.local">
```

It works by including and building the ES6-module that is part of the NPM package in a way that makes it possible to lazy load in a cross origin way.

# Scripts

There are two scripts available:

* `start` - Starts the server, you can set `publicPath` property of webpack by setting the environment variable `$APPLICATION_URL`.
* `build` - Builds the server. There is only a production build available.

# Deployment and hosting

The server application is bundled into a docker image by default and if the azure devops scripts are used will automatically be built during the CI and publication pipelines. This can in turn be host in our docker environment. How that configuration is made can change so please check with the devops team how to proceed.
