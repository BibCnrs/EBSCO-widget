'use strict';

require('babel/register')({ blacklist: [ 'regenerator' ] });
var config = require('config');

var env = process.env.NODE_ENV || 'development';
var config = require('config');
var app = require('./server');

if (!module.parent) {
    app.listen(config.mock.port);

    console.log('Mock server listening on port ' + config.mock.port);
    console.log('Press CTRL+C to stop server');
}
