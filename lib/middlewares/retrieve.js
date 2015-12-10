import actions, { FETCH_NOTICE } from '../actions';

export default store => next => action => retrieve(store, next, action);

export const retrieve = function retrieve(store, next, action) {
    next(action);
    const state = store.getState();
    switch(action.type) {
    case FETCH_NOTICE:
        store.dispatch(actions.retrieve(
            action.index,
            state.results.get(action.index).get('dbId'),
            state.results.get(action.index).get('an'),
            state.url,
            state.login.get('token')
        ));
    }
};
