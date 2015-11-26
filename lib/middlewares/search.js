'use strict';

import actions, { SEARCH_TERM, FULLTEXT_CHANGE, LIMIT_PUBLICATION_DATE } from '../actions';
import limitersToQueryString from '../services/limitersToQueryString';

export default store => next => action => search(store, next, action);

export const search = function search(store, next, action) {
    next(action);
    const state = store.getState();

    switch(action.type) {
    case FULLTEXT_CHANGE:
    case SEARCH_TERM:
    case LIMIT_PUBLICATION_DATE:
        const limiters = state.limiters.toJS();
        const queryString = limitersToQueryString(limiters);
        store.dispatch(
            actions.search(
                `${state.url}/search/${state.search.get('term')}?${queryString}`,
                state.login.get('token')
            )
        );
        break;
    }
};
