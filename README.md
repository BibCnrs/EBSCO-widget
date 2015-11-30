# EBSCO-widget

React widget to fetch data from BibApi

## Installation
`make install`

### development
Launch webpack dev server: `make dev`
Then go to `localhost:3001/webpack-dev-server`
You can add `?debug_session=<name>` to create a session that will save the state
of the application inside localstorage.
You also nned to have BibApi server running on localhost:3000

### build
`make build` to build app.js and app.css in the build directory

## Test
`make test`

## Useful commands

### make stop
stop the server container, useful in production when it run detached.

### make npm
allow to run npm command in the docker npm
```
make npm install koa --save // will run `npm install koa --save` inside the npm docker
```sh
see [npm documentation](https://docs.npmjs.com/all)
