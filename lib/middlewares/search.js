import buildQueryString from '../services/buildQueryString';
import actions, {
    ARTICLE,
    PUBLICATION,
    RELOAD_HISTORY
} from '../actions';

export default store => next => action => search(store, next, action);

const triggerSearch = (state, type, dispatch, action) => {
    const { domain, term, field, limiters, activeFacets, sort } = state[type].search;
    if (!term) {
        return;
    }
    const queries = [{ term, field }];
    const queryString = buildQueryString({
        queries,
        ...limiters,
        currentPage: state[type].searchResult.currentPage,
        activeFacets: activeFacets,
        action,
        sort
    });

    dispatch(
        actions[type].search(
            `${state.url}/${state[type].search.domain}/${type}/search?${queryString}`,
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
    case ARTICLE.PAGE_LOAD:
        if (state.article.searchResult[state.article.searchResult.currentPage]) {
            break;
        }
        triggerSearch(state, 'article', store.dispatch);
        break;
    case ARTICLE.SEARCH_TERM:
    case ARTICLE.LIMIT_SEARCH:
    case RELOAD_HISTORY:
        triggerSearch(state, 'article', store.dispatch);
        break;
    case ARTICLE.APPLY_FACET:
        triggerSearch(state, 'article', store.dispatch);
        break;
    case PUBLICATION.APPLY_FACET:
        triggerSearch(state, 'publication', store.dispatch);
        break;
    case PUBLICATION.PAGE_LOAD:
        if (state.publication.searchResult[state.publication.searchResult.currentPage]) {
            break;
        }
        triggerSearch(state, 'publication', store.dispatch);
        break;
    case PUBLICATION.SEARCH_TERM:
    case PUBLICATION.LIMIT_SEARCH:
        triggerSearch(state, 'publication', store.dispatch);
        break;
    }
};
