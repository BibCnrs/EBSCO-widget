import actions, { FETCH_NOTICE } from '../actions';

export default store => next => action => retrieve(store, next, action);

export const retrieve = function retrieve(store, next, action) {
    next(action);
    const state = store.getState();
    switch(action.type) {
    case FETCH_NOTICE:
        const searchResult = state.searchResult;
        const record = searchResult.get(searchResult.get('currentPage')).get(action.index);
        store.dispatch(actions.retrieve(
            action.index,
            record.get('dbId'),
            record.get('an'),
            state.url,
            state.login.get('token')
        ));
    }
};
