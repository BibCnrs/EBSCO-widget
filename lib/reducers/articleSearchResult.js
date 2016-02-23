import {
    SEARCH_SUCCESS,
    ARTICLE,
    RELOAD_HISTORY,
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
    case ARTICLE.SEARCH_TERM:
    case ARTICLE.LIMIT_SEARCH:
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
