# ##TAG_NAME##

This is the lazy loaded app that makes up the majority of the functionality of the package.

* `serve` - Starts the development service
* `build` - Build the application
* `lint` - Lints the application
* `test` - Runs all the tests

# Custom element

The application is exposed through a custom element that can be found in `##TAG_NAME##.ts`. This file only includes the custom element definition but it lazy loads the main application. The entry point for the rest of the application is the `main` function found in the file `app.ts` this creates a new object that contains all the methods and data required by the custom tag. No direct imports (types and interfaces are an exception) are allowed in the custom element definition file.

# Building

The building for development the entry point is the file `host.ts` and the application is build in a format that suits the dev server. For production the application is build to a single bundle that includes all starting at `app.ts`.

# Dependencies

All dependencies to other microfrontends are strictly `devDependencies` and should **only** be included in `host.ts`. Since the application will bundle everything into a single bundle it can potentially grow to huge sizes. It can also potentially break things since the tag definitions are strictly the responsibility of the host. Other dependencies are probably fine, there is a gotcha
