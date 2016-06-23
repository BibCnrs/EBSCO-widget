import {
    LOGOUT
} from '../actions';

import {
    SEARCH_TERM,
    SEARCH_SUCCESS,
    PAGE_LOAD,
    CHANGE_RESULTS_PER_PAGE
} from '../actions/a2z';

export const defaultState = {
    maxPage: 0
};

export default function publicationSearchResult(state = defaultState, action) {
    switch (action.type) {
    case SEARCH_SUCCESS: {
        const currentPage = action.response.currentPage;
        return {
            ...state,
            currentPage,
            [currentPage]: action.response.results,
            maxPage: action.response.maxPage,
            totalHits: action.response.totalHits
        };
    }
    case SEARCH_TERM:
    case CHANGE_RESULTS_PER_PAGE:
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
