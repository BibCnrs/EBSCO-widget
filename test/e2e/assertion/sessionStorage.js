exports.assertion = function (key, expectedState) {
    this.message = 'message';

    this.expected = expectedState;

    this.pass = function (value) {
        try {
            assert.deepEqual(value, expectedState);
        } catch(error) {
            this.message = error.message;
            return false;
        }
        return true;
    };

    this.value = function (result) {
        return JSON.parse(result.value);
    };

    this.command = function (callback) {
        this.api.getSessionStorageKey(key, callback);

        return this;
    };
};
