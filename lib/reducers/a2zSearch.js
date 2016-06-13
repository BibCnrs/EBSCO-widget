import {
    SEARCH_TERM,
    SEARCH_PENDING,
    SEARCH_ERROR,
    CHANGE_RESULTS_PER_PAGE
} from '../actions/a2z';

export const defaultState = {
    firstLetter: '',
    secondLetter: '',
    term: '',
    field: 'JN',
    status: 'NONE',
    sort: 'title',
    resultsPerPage: 20
};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case SEARCH_TERM:
        return {
            ...state,
            firstLetter: action.firstLetter,
            secondLetter: action.secondLetter
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
    case CHANGE_RESULTS_PER_PAGE:
        return {
            ...state,
            resultsPerPage: action.nbResults
        };
    default:
        return state;
    }
}
