import {
    LOGOUT,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    RETRIEVE_PENDING,
    RETRIEVE_SUCCESS,
    RETRIEVE_ERROR,
    RETRIEVE_LINK_PENDING,
    RETRIEVE_LINK_SUCCESS,
    RETRIEVE_LINK_ERROR,
    CLEAR_ERROR
} from '../actions';

export const defaultState = null;

export default function search(state = defaultState, action) {
    switch (action.type) {
    case RETRIEVE_ERROR:
    case RETRIEVE_LINK_ERROR:
    case SEARCH_ERROR:
        return action.error.message;
    case CLEAR_ERROR:
    case LOGOUT:
    case SEARCH_PENDING:
    case RETRIEVE_SUCCESS:
    case SEARCH_SUCCESS:
    case RETRIEVE_LINK_PENDING:
    case RETRIEVE_LINK_SUCCESS:
    case RETRIEVE_PENDING:
        return defaultState;
    default:
        return state;
    }
}
