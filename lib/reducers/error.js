import {
    API_LOGIN_SUCCESS,
    API_LOGIN_PENDING,
    API_LOGIN_ERROR,
    FETCH_DOMAINS_PENDING,
    FETCH_DOMAINS_ERROR,
    LOGOUT,
    ARTICLE,
    ACCESS_ERROR,
    CLEAR_ERROR
} from '../actions';

export const defaultState = null;

export default function search(state = defaultState, action) {
    switch (action.type) {
    case API_LOGIN_ERROR:
    case ARTICLE.RETRIEVE_ERROR:
    case ARTICLE.RETRIEVE_LINK_ERROR:
    case ARTICLE.SEARCH_ERROR:
    case FETCH_DOMAINS_ERROR:
        return action.error.message || 'An error occured';
    case CLEAR_ERROR:
    case LOGOUT:
    case API_LOGIN_SUCCESS:
    case API_LOGIN_PENDING:
    case ARTICLE.SEARCH_PENDING:
    case ARTICLE.RETRIEVE_SUCCESS:
    case ARTICLE.SEARCH_SUCCESS:
    case ARTICLE.RETRIEVE_LINK_PENDING:
    case ARTICLE.RETRIEVE_LINK_SUCCESS:
    case ARTICLE.RETRIEVE_PENDING:
    case FETCH_DOMAINS_PENDING:
        return defaultState;
    case ACCESS_ERROR:
        return `You do not have access to domain ${action.domain} notice`;
    default:
        return state;
    }
}
