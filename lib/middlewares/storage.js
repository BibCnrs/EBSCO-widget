import {
    ARTICLE,
    DELETE_HISTORY,
    LOGIN,
    LOGOUT
} from '../actions';

export default store => next => action => storage(store, next, action);

export const storage = (store, next, action) => {
    next(action);
    const state = store.getState();

    switch (action.type) {
    case DELETE_HISTORY:
    case ARTICLE.SEARCH_SUCCESS:
        window.localStorage.setItem('EBSCO_WIDGET_history', JSON.stringify(state.article.history));
        break;
    case ARTICLE.DOMAIN_CHANGE:
        window.sessionStorage.setItem('EBSCO_WIDGET_domain', JSON.stringify(action.domain));
        break;
    case LOGIN:
        window.sessionStorage.setItem('EBSCO_WIDGET_username', JSON.stringify(action.username));
        window.sessionStorage.setItem('EBSCO_WIDGET_availableDomains', JSON.stringify(action.domains));
        window.sessionStorage.setItem('EBSCO_WIDGET_domain', JSON.stringify(action.domains[0]));
        break;
    case LOGOUT:
        window.sessionStorage.removeItem('EBSCO_WIDGET_username');
        window.sessionStorage.removeItem('EBSCO_WIDGET_domain');
        window.sessionStorage.removeItem('EBSCO_WIDGET_availableDomains');
        break;
    }
};
