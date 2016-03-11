
exports.command = function(state, callback) {
    this.execute(
        function(state) {
            window.store.dispatch({ type: 'SET_STATE', state: state });

            return true;
        },
        [state, callback],
        function(result) {
            if (typeof callback === 'function') {
                callback(self, result);
            }
        }
    );

    return this;
};
