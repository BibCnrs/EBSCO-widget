exports.assertion = function(expectedCookie) {
    this.message = 'message';

    this.expected = expectedCookie;

    this.pass = function(value) {
        try {
            assert.deepEqual(value, expectedCookie);
        } catch (error) {
            this.message = error.message;
            return false;
        }
        return true;
    };

    this.value = function(result) {
        return result.value;
    };

    this.command = function(callback) {
        this.api.execute(
            function() {
                return document.cookie;
            },
            [],
            result => callback(result),
        );

        return this;
    };
};
