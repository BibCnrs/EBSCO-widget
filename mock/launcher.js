require('babel-register');
require('babel-polyfill');

var app = require('./server');

if (!module.parent) {
    app.listen(80);

    // eslint-disable-next-line no-console
    console.log('Mock server listening on port 80');
    // eslint-disable-next-line no-console
    console.log('Press CTRL+C to stop server');
}
