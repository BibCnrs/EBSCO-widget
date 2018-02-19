exports.command = function(callback) {
    this.execute(
        function() {
            return window.store.getState();
        },
        [],
        function(result) {
            if (typeof callback === 'function') {
                callback(result.value);
            }
        },
    );

    return this;
};
