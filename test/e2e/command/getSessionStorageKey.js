
exports.command = function(key, callback) {
    this.execute(
        function(key) {
            return window.sessionStorage.getItem(key);
        },
        [key],
        function(result) {
            if (typeof callback === 'function') {
                callback(self, result);
            }
        }
    );

    return this;
};
