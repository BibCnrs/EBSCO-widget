exports.assertion = function (css, expectedCount) {
    this.message = 'message';

    this.expected = expectedCount;

    this.pass = function (value) {
        return value === expectedCount;
    };

    this.value = function (state) {
        return state.value.length;
    };

    this.failure = function (value) {
        if (value.state !== 'success') {
            this.message = 'could not find element';
            return true;
        }

        return false;
    };

    this.command = function (callback) {
        this.api.elements('css selector', css, result => callback(result));

        return this;
    };
};
