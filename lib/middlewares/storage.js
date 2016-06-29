import {
    DELETE_HISTORY,
    API_LOGIN_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT,
    FETCH_DOMAINS_SUCCESS,
    SEARCH_SUCCESS
} from '../actions';

export default store => next => action => storage(store, next, action);

export const storage = (store, next, action) => {
    next(action);
    const state = store.getState();

    switch (action.type) {
    case DELETE_HISTORY:
    case SEARCH_SUCCESS:
        if(action.category !== 'article') {
            break;
        }
        window.localStorage.setItem('EBSCO_WIDGET_history', JSON.stringify(state.history));
        break;
    case FETCH_DOMAINS_SUCCESS:
        window.sessionStorage.setItem('EBSCO_WIDGET_allDomains', JSON.stringify(action.response));
        break;
    case API_LOGIN_SUCCESS:
    case LOGIN_SUCCESS:
        window.sessionStorage.setItem('EBSCO_WIDGET_username', JSON.stringify(action.response.username));
        window.sessionStorage.setItem('EBSCO_WIDGET_availableDomains', JSON.stringify(action.response.domains));
        window.sessionStorage.setItem('EBSCO_WIDGET_domain', JSON.stringify(action.response.domains[0]));
        break;
    case LOGOUT:
        window.sessionStorage.removeItem('EBSCO_WIDGET_username');
        window.sessionStorage.removeItem('EBSCO_WIDGET_domain');
        window.sessionStorage.removeItem('EBSCO_WIDGET_availableDomains');
        break;
    }
};
