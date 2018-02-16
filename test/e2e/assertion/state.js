exports.assertion = function(path, expectedState) {
    this.message = 'message';

    this.expected = expectedState;

    this.pass = function(value) {
        try {
            assert.deepEqual(value, expectedState);
        } catch (error) {
            this.message = error.message;
            return false;
        }
        return true;
    };

    this.value = function(state) {
        if (!path) {
            return state.value;
        }
        return path
            .split('.')
            .reduce((result, key) => result && result[key], state.value);
    };

    this.failure = function(value) {
        if (value.state !== 'success') {
            this.message = 'could not retrieve state';
            return true;
        }

        return false;
    };

    this.command = function(callback) {
        this.api.execute(
            function() {
                return window.store.getState();
            },
            [],
            result => callback(result),
        );

        return this;
    };
};
