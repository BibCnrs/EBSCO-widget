import {
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    SEARCH_PENDING
} from '../actions/a2z';

import a2zRecord from './a2zRecord';

export default function results(state = [], action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        return action.response.results;
    case SEARCH_PENDING:
    case SEARCH_ERROR:
        return [];
    default:
        const index = action.publicationIndex;
        return (index !== null && typeof index !== 'undefined' && state[index]) ? [
            ...state.slice(0, index),
            a2zRecord(state[index], action),
            ...state.slice(index + 1)
        ] : state;
    }
}
