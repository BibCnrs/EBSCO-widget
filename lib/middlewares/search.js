import actions, { SEARCH_TERM, LIMIT_SEARCH, RESET_LIMITER } from '../actions';
import limitersToQueryString from '../services/limitersToQueryString';

export default store => next => action => search(store, next, action);

export const search = function search(store, next, action) {
    next(action);
    const state = store.getState();

    switch(action.type) {
    case SEARCH_TERM:
    case LIMIT_SEARCH:
    case RESET_LIMITER:
        const limiters = state.limiters.toJS();
        const queryString = limitersToQueryString(limiters);
        store.dispatch(
            actions.search(
                `${state.url}/search/${state.search.get('currentDomain')}/${state.search.get('term')}?${queryString}`,
                state.login.get('token')
            )
        );
        break;
    }
};
