import {
    ARTICLE,
    LOGOUT
} from '../actions';

export default function results(state = [], action) {
    switch (action.type) {
    case ARTICLE.SEARCH_SUCCESS:
        return action.response.results;
    case ARTICLE.SEARCH_PENDING:
    case ARTICLE.SEARCH_ERROR:
    case LOGOUT:
        return [];
    default:
        return state;
    }
}
