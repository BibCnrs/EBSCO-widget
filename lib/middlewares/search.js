import buildQueryString from '../services/buildQueryString';
import actions, {
    ARTICLE,
    PUBLICATION,
    RELOAD_HISTORY,
    TRIGGER_EBSCO_ACTION
} from '../actions';

export default store => next => action => search(store, next, action);

const triggerSearch = (state, type, dispatch, action) => {
    const { domain, term, limiters, activeFacets } = state[type].search;
    if (!term) {
        return;
    }
    console.log(limiters);
    const queryString = buildQueryString({
        term,
        ...limiters,
        currentPage: state[type].searchResult.currentPage,
        activeFacets: activeFacets,
        action
    });
    console.log(queryString);

    dispatch(
        actions[type].search(
            `${state.url}/${state[type].search.domain}/search/${type}?${queryString}`,
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
    case TRIGGER_EBSCO_ACTION:
        triggerSearch(state, 'article', store.dispatch, action.value);
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
