import {
    SEARCH_SUCCESS
} from '../actions';

export default store => next => action => loginToken(store, next, action);

export const loginToken = function loginToken(store, next, action) {
    next(action);

    switch (action.type) {
    case SEARCH_SUCCESS:
        const state = store.getState();
        window.localStorage.setItem(`query${JSON.stringify(action.query)}`, JSON.stringify(state.searchResult));
        break;
    }
};
