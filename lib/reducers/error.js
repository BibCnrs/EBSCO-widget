import {
    LOGIN_SUCCESS,
    LOGIN_PENDING,
    LOGIN_ERROR,
    FETCH_DOMAINS_PENDING,
    FETCH_DOMAINS_ERROR,
    LOGOUT,
    ACCESS_ERROR,
    CLEAR_ERROR,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
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
    case LOGIN_ERROR:
    case RETRIEVE_ERROR:
    case RETRIEVE_LINK_ERROR:
    case SEARCH_ERROR:
    case FETCH_DOMAINS_ERROR:
    case 'ERROR':
    case ACCESS_ERROR:
        return {
            type: action.type,
            code: action.error && action.error.code,
            data: action
        };
    case CLEAR_ERROR:
    case LOGOUT:
    case LOGIN_SUCCESS:
    case LOGIN_PENDING:
    case SEARCH_PENDING:
    case RETRIEVE_SUCCESS:
    case SEARCH_SUCCESS:
    case RETRIEVE_LINK_PENDING:
    case RETRIEVE_LINK_SUCCESS:
    case RETRIEVE_PENDING:
    case FETCH_DOMAINS_PENDING:
        return defaultState;
    default:
        return state;
    }
}
