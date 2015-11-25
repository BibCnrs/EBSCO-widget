'use strict';

import actions, { FULLTEXT_CHANGE, PUBLICATION_DATE_CHANGE } from '../actions';

export default store => next => action => search(store, next, action);

export const search = function loginToken(store, next, action) {
    next(action);
    const state = store.getState();
    switch(action.type) {
    case FULLTEXT_CHANGE:
        store.dispatch(actions.search('http://localhost:3000/api', state.login.get('token'), state.search.get('term'), state.limiters.toJS()));
        break;
    case PUBLICATION_DATE_CHANGE:
        store.dispatch(
            actions.search(
                'http://localhost:3000/api',
                state.login.get('token'),
                state.search.get('term'),
                state.limiters.toJS()
            )
        );
        break;
    }
};
