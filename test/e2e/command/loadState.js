
exports.command = function(state) {
    this.execute(
        function(state) {
            return window.store.dispatch({ type: 'SET_STATE', state: state });
        },
        [state]
    );

    return this;
};
