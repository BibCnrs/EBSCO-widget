// require('babel-core/register')({ blacklist: [ 'regenerator' ] });

var app = require('./server');

if (!module.parent) {
    app.listen(80);

    console.log('Mock server listening on port 80');
    console.log('Press CTRL+C to stop server');
}
