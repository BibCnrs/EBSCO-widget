import buildQueryString from '../services/buildQueryString';
import actions, {
    SEARCH_TERM,
    LIMIT_SEARCH,
    RESET_LIMITER,
    PAGE_LOAD,
    RELOAD_HISTORY,
    CHANGE_FACET
} from '../actions';

export default store => next => action => search(store, next, action);

const getAction = (facets, key) => {
    if (!facets[key]) {
        return null;
    }
    if (!facets[key].choices || !facets[key].value) {
        return null;
    }
    if (!facets[key].choices[facets[key].value]) {
        return null;
    }
    return facets[key].choices[facets[key].value].AddAction;
};

const triggerSearch = (state, dispatch) => {
    const { domain, term, limiters } = state.search;
    const { facets } = state;
    const queryString = buildQueryString({
        ...limiters,
        currentPage: state.searchResult.currentPage,
        actions: Object.keys(facets)
        .map((key) => getAction(facets, key))
        .filter((v) => !!v)
    });

    dispatch(
        actions.search(
            `${state.url}/search/${state.search.domain}/${state.search.term}?${queryString}`,
            state.login.token,
            {
                term,
                domain,
                limiters
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
    case RESET_LIMITER:
    case RELOAD_HISTORY:
    case CHANGE_FACET:
        triggerSearch(state, store.dispatch);
        break;
    }
};
