'use strict';

import actions, { SEARCH_TERM, FULLTEXT_CHANGE, LIMIT_PUBLICATION_DATE, FETCH_NOTICE } from '../actions';

export default store => next => action => search(store, next, action);

export const search = function loginToken(store, next, action) {
    next(action);
    const state = store.getState();
    switch(action.type) {
    case FULLTEXT_CHANGE:
    case SEARCH_TERM:
    case LIMIT_PUBLICATION_DATE:
        store.dispatch(
            actions.search(
                state.url,
                state.login.get('token'),
                state.search.get('term'),
                state.limiters.toJS()
            )
        );
        break;
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
