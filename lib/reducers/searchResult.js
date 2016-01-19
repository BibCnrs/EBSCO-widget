import {
    SEARCH_SUCCESS,
    SEARCH_TERM,
    RESET,
    RELOAD_HISTORY,
    LIMIT_SEARCH,
    TRIGGER_EBSCO_ACTION,
    LOGOUT,
    PAGE_LOAD
} from '../actions';

import recordList from './recordList';

export const defaultState = {
    maxPage: 0
};

export default function searchResult(state = defaultState, action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        const currentPage = action.response.currentPage;
        return {
            ...state,
            currentPage,
            [currentPage]: recordList(action.response.results, action),
            maxPage: action.response.maxPage,
            totalHits: action.response.totalHits
        };
    case SEARCH_TERM:
    case LIMIT_SEARCH:
    case RESET:
    case RELOAD_HISTORY:
    case LOGOUT:
    case TRIGGER_EBSCO_ACTION:
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
            [page]: recordList(state[page], action)
        };
    }
}
