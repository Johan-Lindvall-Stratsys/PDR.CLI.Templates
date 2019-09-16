CLI Templates
---

# The templates

This repository includes the base templates for the PDR CLI. The different templates are in different branches as follows. 

* `base` - The base template with minimal frontend, includes azure configuration, build scripts, docker configuration and server code.
* `vue` - Extends the `base` template with a Vue frontend. 
* `lazy` - Extends the `base` template with a minimal lazy loaded frontend and linting.

The templates are not meant to be consumed directly but through the PDR CLI (available with `npx @stratsys/pdr-cli`). They include variables that have to be replaced and other configuration that has to be made. 
