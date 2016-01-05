import buildQueryString from '../services/buildQueryString';
import actions, {
    SEARCH_TERM,
    LIMIT_SEARCH,
    RESET_LIMITER,
    PAGE_LOAD
} from '../actions';

export default store => next => action => search(store, next, action);

const triggerSearch = (state, dispatch) => {
    const limiters = state.search.get('limiters').toJS();
    const queryString = buildQueryString({
        ...limiters,
        currentPage: state.searchResult.get('currentPage')
    });
    dispatch(
        actions.search(
            `${state.url}/search/${state.search.get('currentDomain')}/${state.search.get('term')}?${queryString}`,
            state.login.get('token')
        )
    );
};

export const search = function search(store, next, action) {
    next(action);
    const state = store.getState();

    switch(action.type) {
    case PAGE_LOAD:
        if (state.searchResult.get(state.searchResult.get('currentPage'))) {
            break;
        }
        triggerSearch(state, store.dispatch);
        break;
    case SEARCH_TERM:
    case LIMIT_SEARCH:
    case RESET_LIMITER:
        triggerSearch(state, store.dispatch);
        break;
    }
};
