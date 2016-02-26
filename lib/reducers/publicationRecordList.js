import {
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    SEARCH_PENDING
} from '../actions/publication';

import publicationRecord from './publicationRecord';

export default function results(state = [], action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        return action.response.results;
    case SEARCH_PENDING:
    case SEARCH_ERROR:
        return [];
    default:
        const index = action.index;
        return (index !== null && typeof index !== 'undefined') ? [
            ...state.slice(0, index),
            publicationRecord(state[index], action),
            ...state.slice(index + 1)
        ] : state;
    }
}
