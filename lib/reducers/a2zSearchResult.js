import {
    LOGOUT
} from '../actions';

import {
    SEARCH_TERM,
    SEARCH_SUCCESS,
    PAGE_LOAD,
    CHANGE_RESULTS_PER_PAGE
} from '../actions/a2z';

import a2zRecordList from './a2zRecordList';

export const defaultState = {
    maxPage: 0
};

export default function publicationSearchResult(state = defaultState, action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        const currentPage = action.response.currentPage;
        return {
            ...state,
            currentPage,
            [currentPage]: a2zRecordList(action.response.results, action),
            maxPage: action.response.maxPage,
            totalHits: action.response.totalHits
        };
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
        const page = state.currentPage;
        if (!page) {
            return state;
        }
        return {
            ...state,
            [page]: a2zRecordList(state[page], action)
        };
    }
}
