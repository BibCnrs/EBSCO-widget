import {
    PUBLICATION,
    LOGOUT
} from '../actions';

const {
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    SEARCH_PENDING
} = PUBLICATION;

export default function results(state = [], action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        return action.response.results;
    case SEARCH_PENDING:
    case SEARCH_ERROR:
    case LOGOUT:
        return [];
    default:
        return state;
    }
}
