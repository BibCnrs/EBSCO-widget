import {
    LOGOUT,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    CHANGE_SORT,
    CHANGE_RESULTS_PER_PAGE
} from '../actions';

export const defaultState = {
    article: {
        status: 'NONE',
        sort: 'relevance',
        resultsPerPage: 20,
        dateRange: {
            min: 1000,
            max: new Date().getFullYear() + 1
        }
    },
    a2z: {
        status: 'NONE',
        sort: 'title',
        resultsPerPage: 20
    },
    publication: {
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
    default:
        return state;
    }
};

export default createSearch;

export const getSearchValueByName = (state, name) => state[name];
export const getSearchResultsPerPage = (state) => getSearchValueByName(state, 'resultsPerPage');
export const getSearchSort = (state) => getSearchValueByName(state, 'sort');
export const getSearchDateRange = (state) => getSearchValueByName(state, 'dateRange');
export const getSearchStatus = (state) => getSearchValueByName(state, 'status');
