import { availableFields } from '../config/article';
import {
    LOGOUT,
    RELOAD_HISTORY,
    RESTORE_HISTORY,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    CHANGE_SORT,
    LINKED_SEARCH,
    CHANGE_RESULTS_PER_PAGE
} from '../actions';

import articleLimiters, { defaultState as articleLimitersDefaultState } from './articleLimiters';
import articleQueryList, { defaultState as articleQueryListDefaultState } from './articleQueryList';

export const defaultState = {
    queries: articleQueryListDefaultState,
    status: 'NONE',
    domain: null,
    availableDomains: [],
    limiters: articleLimitersDefaultState,
    sort: 'relevance',
    resultsPerPage: 20,
    dateRange: {
        min: 1000,
        max: new Date().getFullYear() + 1
    }
};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case LOGOUT:
        return defaultState;
    case SEARCH_PENDING:
        return {
            ...state,
            status: 'PENDING'
        };
    case SEARCH_SUCCESS:
        return {
            ...state,
            dateRange: action.response.dateRange,
            status: 'DONE'
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
    case CHANGE_SORT:
        return {
            ...state,
            sort: action.value
        };
    case RESTORE_HISTORY:
    case RELOAD_HISTORY:
        return {
            ...state,
            ...action.query
        };
    case LINKED_SEARCH:
        if (availableFields.indexOf(action.field) === -1) {
            return {
                ...state,
                limiters: articleLimitersDefaultState,
                queries: articleQueryList(state.queries, {
                    type: action.type,
                    field: null,
                    term: `${action.field} ${action.term}`
                })
            };
        }

        return {
            ...state,
            limiters: articleLimitersDefaultState,
            queries: articleQueryList(state.queries, action)
        };
    default:
        return {
            ...state,
            limiters: articleLimiters(state.limiters, action),
            queries: articleQueryList(state.queries, action)
        };
    }
}
