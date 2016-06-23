import {
    RELOAD_HISTORY,
    LOGOUT
} from '../actions';

import {
    SEARCH_TERM,
    LIMIT_SEARCH,
    SEARCH_SUCCESS,
    PAGE_LOAD,
    CHANGE_RESULTS_PER_PAGE
} from '../actions/article';

import uncapitalizeKeys from '../services/uncapitalizeKeys';

export const defaultState = {
    maxPage: 0
};

export default function articleSearchResult(state = defaultState, action) {
    switch (action.type) {
    case SEARCH_SUCCESS: {
        const currentPage = action.response.currentPage;
        return {
            ...state,
            currentPage,
            [currentPage]: action.response.results,
            facets: uncapitalizeKeys(action.response.facets)  || [],
            maxPage: action.response.maxPage,
            totalHits: action.response.totalHits
        };
    }
    case SEARCH_TERM:
    case LIMIT_SEARCH:
    case CHANGE_RESULTS_PER_PAGE:
    case RELOAD_HISTORY:
    case LOGOUT:
        return defaultState;
    case PAGE_LOAD:
        return {
            ...state,
            currentPage: action.page
        };
    default:
        return state;
    }
}
