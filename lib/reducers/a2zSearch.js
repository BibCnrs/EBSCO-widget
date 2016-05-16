import {
    SEARCH_TERM,
    SEARCH_PENDING,
    SEARCH_ERROR
} from '../actions/a2z';

export const defaultState = {
    term: '',
    field: 'JN',
    status: 'NONE',
    sort: 'title'
};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case SEARCH_TERM:
        return {
            ...state,
            queries: action.queries
        };
    case SEARCH_PENDING:
        return {
            ...state,
            status: 'PENDING'
        };
    case SEARCH_ERROR:
        return {
            ...state,
            status: 'DONE'
        };
    default:
        return state;
    }
}
