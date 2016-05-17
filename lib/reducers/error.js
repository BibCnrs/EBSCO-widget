import {
    API_LOGIN_SUCCESS,
    API_LOGIN_PENDING,
    API_LOGIN_ERROR,
    FETCH_DOMAINS_PENDING,
    FETCH_DOMAINS_ERROR,
    LOGOUT,
    ARTICLE,
    PUBLICATION,
    A2Z,
    ACCESS_ERROR,
    CLEAR_ERROR
} from '../actions';

export const defaultState = {};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case API_LOGIN_ERROR:
    case ARTICLE.RETRIEVE_ERROR:
    case ARTICLE.RETRIEVE_LINK_ERROR:
    case ARTICLE.SEARCH_ERROR:
    case PUBLICATION.SEARCH_ERROR:
    case PUBLICATION.RETRIEVE_ERROR:
    case A2Z.SEARCH_ERROR:
    case A2Z.RETRIEVE_ERROR:
    case FETCH_DOMAINS_ERROR:
    case ACCESS_ERROR:
        return {
            type: action.type,
            code: action.error.code,
            data: action
        };
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
    default:
        return state;
    }
}
