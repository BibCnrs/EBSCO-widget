import buildQueryString from '../services/buildQueryString';
import actions, {
    SEARCH_TERM,
    LIMIT_SEARCH,
    RESET_LIMITER,
    PAGE_LOAD,
    RELOAD_HISTORY,
    TRIGGER_EBSCO_ACTION
} from '../actions';

export default store => next => action => search(store, next, action);

const triggerSearch = (state, dispatch, facet) => {
    const { domain, term, limiters } = state.search;
    const queryString = buildQueryString({
        ...limiters,
        currentPage: state.searchResult.currentPage,
        facet
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
        triggerSearch(state, store.dispatch);
        break;
    case TRIGGER_EBSCO_ACTION:
        triggerSearch(state, store.dispatch, action.value);
        break;
    }
};
