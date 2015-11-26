'use strict';

import actions, { SEARCH_TERM, FULLTEXT_CHANGE, LIMIT_PUBLICATION_DATE } from '../actions';

export default store => next => action => search(store, next, action);

export const search = function search(store, next, action) {
    next(action);
    const state = store.getState();

    switch(action.type) {
    case FULLTEXT_CHANGE:
    case SEARCH_TERM:
    case LIMIT_PUBLICATION_DATE:
        const limiters = state.limiters.toJS();
        const queryString = Object.keys(limiters)
        .filter((key) => !!limiters[key])
        .map((key) => {
            switch (key) {
            case 'fullText':
                return 'FT=Y';
            case 'publicationDate':
                return `DT1=${limiters[key].from}/${limiters[key].to}`;
            }
        }).join('&');
        store.dispatch(
            actions.search(
                `${state.url}/search/${state.search.get('term')}?${queryString}`,
                state.login.get('token')
            )
        );
        break;
    }
};
