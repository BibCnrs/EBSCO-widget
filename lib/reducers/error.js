import {
    LOGOUT,
    ARTICLE,
    CLEAR_ERROR
} from '../actions';

export const defaultState = null;

export default function search(state = defaultState, action) {
    switch (action.type) {
    case ARTICLE.RETRIEVE_ERROR:
    case ARTICLE.RETRIEVE_LINK_ERROR:
    case ARTICLE.SEARCH_ERROR:
        return action.error.message || 'An error occured';
    case CLEAR_ERROR:
    case LOGOUT:
    case ARTICLE.SEARCH_PENDING:
    case ARTICLE.RETRIEVE_SUCCESS:
    case ARTICLE.SEARCH_SUCCESS:
    case ARTICLE.RETRIEVE_LINK_PENDING:
    case ARTICLE.RETRIEVE_LINK_SUCCESS:
    case ARTICLE.RETRIEVE_PENDING:
        return defaultState;
    default:
        return state;
    }
}
