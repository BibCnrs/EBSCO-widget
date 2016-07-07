import buildQueryString from '../services/buildQueryString';
import * as fromState from '../reducers';
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
    const domain = fromState.getCurrentDomain(state);
    if (!domain) {
        return;
    }
    const limiters = fromState.getCurrentLimiters(state);
    const activeFacets = fromState.getActiveFacetValues(state);
    const sort = fromState.getSearchSort(state);
    const resultsPerPage = fromState.getSearchResultsPerPage(state);
    const queries = fromState.getCurrentQueryList(state);
    if (!queries[0].term) {
        return;
    }
    const queryString = buildQueryString({
        queries,
        ...limiters,
        resultsPerPage,
        currentPage: fromState.getCurrentPage(state),
        activeFacets: activeFacets,
        action,
        sort
    });

    dispatch(
        actions.search(
            type,
            `${state.url}/${domain}/${type === 'article' ? 'article' : 'publication' }/search?${queryString}`,
            fromState.getToken(state),
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
        if (fromState.getCurrentPageData(state)) {
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
