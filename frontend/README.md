# ##TAG_NAME##

This is the vue app that makes up the majority of the functionality of the package. It is build with the Vue CLI and is configured to work better in our particular environment.

The nature of our microfrontend applications makes this slightly different than you average Vue CLI project. Some key differences are

* The production build is a library
* The application is exposed through a custom element
* Some dependencies can not be configured as usual

The available yarn scripts are

* `serve` - Starts the development service
* `build` - Build the application
* `lint` - Lints the application with a custom eslint script
* `lint:cli-service` - The default Vue CLI linting
* `test:unit` - The default Vue CLI command for running tests
* `test` - Shorthand for running tests

# Library build

When building for production the application is packaged as a library with Vue included. This makes for a self-sustained application at the cost of a larger bundle size. However since the applications are lazy loaded this does not have the same impact as it would traditionally have.

# Custom element

The application is exposed through a custom element that can be found in `##TAG_NAME##.ts`. This file only includes the custom element definition but it lazy loads the main application. The entry point for the Vue application is the `main` function found in the file `app.ts` this creates a new object that contains all the methods and data required by the custom tag. No direct imports (types and interfaces are an exception) are allowed in the custom element definition file.

During development the entry point is swapped to the file `host.ts`. This emulates the environment where the microfrontend will be run. A key point about this is how dependencies to other microfrontends are handled.

# Dependencies

All dependencies to other microfrontends are strictly `devDependencies` and should **only** be included in `host.ts`. Since the application will bundle everything into a single bundle it can potentially grow to huge sizes. It can also potentially break things since the tag definitions are strictly the responsibility of the host.
