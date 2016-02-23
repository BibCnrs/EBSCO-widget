import {
    SEARCH_SUCCESS,
    DELETE_HISTORY
} from '../actions';

export default store => next => action => loginToken(store, next, action);

export const loginToken = function loginToken(store, next, action) {
    next(action);
    const state = store.getState();

    switch (action.type) {
    case DELETE_HISTORY:
    case SEARCH_SUCCESS:
        window.localStorage.setItem('history', JSON.stringify(state.article.history));
        break;
    }
};
