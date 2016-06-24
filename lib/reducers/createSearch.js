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
    SEARCH_LETTERS,
    CHANGE_TERM,
    CHANGE_FIELD,
    CHANGE_RESULTS_PER_PAGE
} from '../actions';

import articleQueryList, { defaultState as articleQueryListDefaultState } from './articleQueryList';

export const defaultState = {
    article: {
        queries: articleQueryListDefaultState,
        status: 'NONE',
        domain: null,
        availableDomains: [],
        sort: 'relevance',
        resultsPerPage: 20,
        dateRange: {
            min: 1000,
            max: new Date().getFullYear() + 1
        }
    },
    a2z: {
        firstLetter: '',
        secondLetter: '',
        term: '',
        field: 'JN',
        status: 'NONE',
        sort: 'title',
        resultsPerPage: 20
    },
    publication: {
        term: '',
        field: null,
        status: 'NONE',
        sort: 'relevance',
        resultsPerPage: 20
    }
};

const createSearch = (category) => (state = defaultState[category], action) => {
    if(action.category !== category) {
        return state;
    }

    switch (action.type) {
    case LOGOUT:
        return defaultState[category];
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
    case SEARCH_LETTERS:
        return {
            ...state,
            firstLetter: action.firstLetter,
            secondLetter: action.secondLetter
        };
    case CHANGE_TERM:
        return {
            ...state,
            term: action.term
        };
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
                queries: articleQueryList(state.queries, {
                    type: action.type,
                    field: null,
                    term: `${action.field} ${action.term}`
                })
            };
        }

        return {
            ...state,
            queries: articleQueryList(state.queries, action)
        };
    default:
        return {
            ...state,
            queries: articleQueryList(state.queries, action)
        };
    }
};

export default createSearch;

export const getSearchValueByName = (state, name) => {
    return state[name];
};
