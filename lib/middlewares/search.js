import buildQueryString from '../services/buildQueryString';
import extractActiveFacet from '../services/extractActiveFacet';
import actions, {
    SEARCH_TERM,
    LIMIT_SEARCH,
    RESET,
    PAGE_LOAD,
    RELOAD_HISTORY,
    TRIGGER_EBSCO_ACTION
} from '../actions';

export default store => next => action => search(store, next, action);

const triggerSearch = (state, dispatch, action) => {
    const { domain, term, limiters, facets } = state.search;
    const queryString = buildQueryString({
        ...limiters,
        currentPage: state.searchResult.currentPage,
        activeFacets: extractActiveFacet(facets),
        action
    });

    dispatch(
        actions.search(
            `${state.url}/search/${state.search.domain}/${state.search.term}?${queryString}`,
            state.login.token,
            {
                term,
                domain,
                limiters,
                facets
            }
        )
    );
};

export const search = function search(store, next, action) {
    next(action);
    const state = store.getState();

    switch(action.type) {
    case PAGE_LOAD:
        if (state.searchResult[state.searchResult.currentPage]) {
            break;
        }
        triggerSearch(state, store.dispatch);
        break;
    case SEARCH_TERM:
    case LIMIT_SEARCH:
    case RESET:
    case RELOAD_HISTORY:
        triggerSearch(state, store.dispatch);
        break;
    case TRIGGER_EBSCO_ACTION:
        triggerSearch(state, store.dispatch, action.value);
        break;
    }
};
