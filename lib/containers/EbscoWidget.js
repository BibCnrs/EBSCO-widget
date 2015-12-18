if (__DEVELOPMENT__) {
    module.exports = require('./EbscoWidget.dev');
} else {
    module.exports = require('./EbscoWidget.prod');
}
