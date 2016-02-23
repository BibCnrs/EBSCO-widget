import {
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    SEARCH_PENDING,
    LOGOUT
} from '../actions';

import articleRecord from './articleRecord';

export default function results(state = [], action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        return action.response.results
        .map((item) => articleRecord(item, action));
    case SEARCH_PENDING:
    case SEARCH_ERROR:
    case LOGOUT:
        return [];
    default:
        const index = action.index;
        return (index !== null && typeof index !== 'undefined') ? [
            ...state.slice(0, index),
            articleRecord(state[index], action),
            ...state.slice(index + 1)
        ] : state;
    }
}
