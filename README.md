CLI Templates
---

# The templates

This repository includes the base templates for the PDR CLI. The different templates are in different branches as follows. 

* `base` - The base template with minimal frontend, includes azure configuration, build scripts, docker configuration and server code.
* `vue` - Extends the `base` template with a Vue frontend. 
* `lazy` - Extends the `base` template with a minimal lazy loaded frontend and linting.

The templates are not meant to be consumed directly but through the PDR CLI (available with `npx @stratsys/pdr-cli`). They include variables that have to be replaced and other configuration that has to be made. 

# Altering the templates

When altering the templates it is important that the right template is modified. When any changes are made to anything that is shared the changes should be made in the `base` branch and merged to the `vue` and `lazy` branches. Changes made to any of those branch should never be merge down into base. The idea is that changes propagate from `base` to any other setup.