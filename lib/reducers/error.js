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
    CLEAR_ERROR,
    RETRIEVE_SUCCESS,
    RETRIEVE_PENDING,
    RETRIEVE_ERROR,
    RETRIEVE_LINK_SUCCESS,
    RETRIEVE_LINK_PENDING,
    RETRIEVE_LINK_ERROR
} from '../actions';

export const defaultState = {};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case API_LOGIN_ERROR:
    case RETRIEVE_ERROR:
    case RETRIEVE_LINK_ERROR:
    case ARTICLE.SEARCH_ERROR:
    case PUBLICATION.SEARCH_ERROR:
    case A2Z.SEARCH_ERROR:
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
    case RETRIEVE_SUCCESS:
    case ARTICLE.SEARCH_SUCCESS:
    case RETRIEVE_LINK_PENDING:
    case RETRIEVE_LINK_SUCCESS:
    case RETRIEVE_PENDING:
    case FETCH_DOMAINS_PENDING:
        return defaultState;
    default:
        return state;
    }
}
