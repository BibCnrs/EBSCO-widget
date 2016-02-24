import {
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    SEARCH_PENDING
} from '../actions/publication';

export default function results(state = [], action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        return action.response.results;
    case SEARCH_PENDING:
    case SEARCH_ERROR:
        return [];
    default:
        return state;
    }
}
