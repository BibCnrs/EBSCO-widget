import buildQueryString from '../services/buildQueryString';
import actions, {
    ARTICLE,
    LIMIT_SEARCH,
    PAGE_LOAD,
    RELOAD_HISTORY,
    TRIGGER_EBSCO_ACTION
} from '../actions';

export default store => next => action => search(store, next, action);

const triggerSearch = (state, dispatch, action) => {
    const { domain, term, limiters, activeFacets } = state.articleSearch;
    if (!term) {
        return;
    }
    const queryString = buildQueryString({
        term,
        ...limiters,
        currentPage: state.articleSearchResult.currentPage,
        activeFacets: activeFacets,
        action
    });

    dispatch(
        actions.search(
            `${state.url}/${state.articleSearch.domain}/search/article?${queryString}`,
            state.login.token,
            {
                term,
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
        if (state.articleSearchResult[state.articleSearchResult.currentPage]) {
            break;
        }
        triggerSearch(state, store.dispatch);
        break;
    case ARTICLE.SEARCH_TERM:
    case LIMIT_SEARCH:
    case RELOAD_HISTORY:
        triggerSearch(state, store.dispatch);
        break;
    case TRIGGER_EBSCO_ACTION:
        triggerSearch(state, store.dispatch, action.value);
        break;
    }
};
