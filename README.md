# EBSCO-widget

React widget to fetch data from BibApi

## Installation
install with npm `npm install ebsco-widget`
Add the widget js and css
```html
<link rel="stylesheet" id="ebsco_widget-css" href="/build/app.css?ver=0.13.1" type="text/css" media="all">
<script type="text/javascript" src="/build/app.js?ver=0.13.1"></script>
```

Simply add a div to the target page:
```html
<div id="ebsco_widget"></div>
```
and then the js:
```js
document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        var rootElement = document.getElementById('ebsco_widget');
        window.ReactDom.render(React.createElement(window.EbscoWidget, {
            url: 'url toward bibapi', //mandatory
            domain: 'default domain' // optional: the institute that the widget will use per default if available
        }), rootElement);
    }
};
```


## development

`make install`
Launch webpack dev server: `make dev`
Then go to `localhost:3001/webpack-dev-server`
You can add `?debug_session=<name>` to create a session that will save the state
of the application inside localstorage.
You also need to have BibApi server running on localhost:3000

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
```
