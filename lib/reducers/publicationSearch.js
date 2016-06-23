import {
    CHANGE_TERM,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    CHANGE_SORT,
    CHANGE_FIELD,
    CHANGE_RESULTS_PER_PAGE
} from '../actions/publication';

import publicationLimiters, { defaultState as publicationLimitersDefaultState } from './publicationLimiters';

export const defaultState = {
    term: '',
    field: null,
    status: 'NONE',
    limiters: publicationLimitersDefaultState,
    sort: 'relevance',
    resultsPerPage: 20
};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case CHANGE_TERM:
        return {
            ...state,
            term: action.term
        };
    case SEARCH_PENDING:
        return {
            ...state,
            status: 'PENDING'
        };
    case SEARCH_SUCCESS:
        return {
            ...state,
            status: 'DONE'
        };
    case SEARCH_ERROR:
        return {
            ...state,
            status: 'DONE'
        };
    case CHANGE_SORT: {
        return {
            ...state,
            sort: action.value
        };
    }
    case CHANGE_FIELD: {
        return {
            ...state,
            field: action.value
        };
    }
    case CHANGE_RESULTS_PER_PAGE:
        return {
            ...state,
            resultsPerPage: action.nbResults
        };
    default:
        return {
            ...state,
            limiters: publicationLimiters(state.limiters, action)
        };
    }
}
