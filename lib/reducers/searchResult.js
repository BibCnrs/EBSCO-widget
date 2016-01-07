import {
    SEARCH_SUCCESS,
    SEARCH_TERM,
    LOGOUT,
    PAGE_CHANGE,
    PAGE_LOAD,
    RELOAD_HISTORY
} from '../actions';

import recordList from './recordList';

export default function searchResult(state = { maxPage: 0 }, action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        const currentPage = action.response.currentPage;
        return {
            ...state,
            currentPage,
            targetPage: currentPage,
            [currentPage]: recordList(action.response.results, action),
            maxPage: action.response.maxPage,
            totalHits: action.response.totalHits
        };
    case SEARCH_TERM:
    case LOGOUT:
        return { maxPage: 0 };
    case PAGE_CHANGE:
        return {
            ...state,
            targetPage: action.page
        };
    case PAGE_LOAD:
        return {
            ...state,
            currentPage: action.page,
            targetPage: action.page
        };
    case RELOAD_HISTORY:
        return JSON.parse(window.localStorage.getItem(action.key));
    default:
        const page = state.currentPage;
        return {
            ...state,
            [page]: recordList(state[page], action)
        };
    }
}
