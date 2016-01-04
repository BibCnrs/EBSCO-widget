if (__DEVELOPMENT__) {
    module.exports = require('./store.dev');
} else {
    module.exports = require('./store.prod');
}
