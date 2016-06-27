import _ from 'lodash';

import buildQueryString from '../services/buildQueryString';
import * as fromSearchResult from '../reducers/searchResult';
import actions, {
    PAGE_LOAD,
    SEARCH_TERM,
    SEARCH_LETTERS,
    LIMIT_SEARCH,
    APPLY_FACET,
    CHANGE_RESULTS_PER_PAGE,
    RELOAD_HISTORY,
    CHANGE_SORT,
    LINKED_SEARCH
} from '../actions';

export default store => next => action => search(store, next, action);

export const triggerSearch = (state, type, dispatch, action) => {
    const domain = state.domains[type];
    if (!domain) {
        return;
    }
    const limiters = state.limiters[type];
    const activeFacets = state.facets[type] && state.facets[type].active;
    const { sort, resultsPerPage } = state.search[type];
    const queries = state.queryList[type];
    if (!queries[0].term) {
        return;
    }
    const queryString = buildQueryString({
        queries,
        ...limiters,
        resultsPerPage,
        currentPage: state.searchResult[type].currentPage,
        activeFacets: activeFacets,
        action,
        sort
    });

    dispatch(
        actions.search(
            type,
            `${state.url}/${domain}/${type === 'article' ? 'article' : 'publication' }/search?${queryString}`,
            state.login.token,
            {
                queries,
                domain,
                limiters,
                activeFacets,
                action
            }
        )
    );
};

export const search = function search(store, next, action) {
    next(action);
    const state = store.getState();

    switch(action.type) {
    case PAGE_LOAD:
        if (fromSearchResult.getCurrentPage(state.searchResult, action.category)) {
            break;
        }
        triggerSearch(state, action.category, store.dispatch);
        break;
    case SEARCH_TERM:
    case SEARCH_LETTERS:
    case LIMIT_SEARCH:
    case APPLY_FACET:
    case CHANGE_RESULTS_PER_PAGE:
    case RELOAD_HISTORY:
    case CHANGE_SORT:
    case LINKED_SEARCH:
        triggerSearch(state, action.category, store.dispatch);
        break;
    }
};
