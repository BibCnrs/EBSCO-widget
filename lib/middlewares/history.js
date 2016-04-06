import {
    ARTICLE,
    DELETE_HISTORY
} from '../actions';

export default store => next => action => history(store, next, action);

export const history = function history(store, next, action) {
    next(action);
    const state = store.getState();

    switch (action.type) {
    case DELETE_HISTORY:
    case ARTICLE.SEARCH_SUCCESS:
        window.localStorage.setItem('history', JSON.stringify(state.article.history));
        break;
    }
};
