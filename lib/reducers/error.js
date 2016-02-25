import {
    LOGOUT,
    ARTICLE,
    RETRIEVE_PENDING,
    RETRIEVE_SUCCESS,
    RETRIEVE_ERROR,
    LOGIN_ERROR,
    RETRIEVE_LINK_PENDING,
    RETRIEVE_LINK_SUCCESS,
    RETRIEVE_LINK_ERROR,
    CLEAR_ERROR
} from '../actions';

export const defaultState = null;

export default function search(state = defaultState, action) {
    switch (action.type) {
    case LOGIN_ERROR:
    case RETRIEVE_ERROR:
    case RETRIEVE_LINK_ERROR:
    case ARTICLE.SEARCH_ERROR:
        return action.error.message;
    case CLEAR_ERROR:
    case LOGOUT:
    case ARTICLE.SEARCH_PENDING:
    case RETRIEVE_SUCCESS:
    case ARTICLE.SEARCH_SUCCESS:
    case RETRIEVE_LINK_PENDING:
    case RETRIEVE_LINK_SUCCESS:
    case RETRIEVE_PENDING:
        return defaultState;
    default:
        return state;
    }
}
