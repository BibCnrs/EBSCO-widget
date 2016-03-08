import {
    RELOAD_HISTORY,
    LOGOUT
} from '../actions';

import {
    SEARCH_TERM,
    LIMIT_SEARCH,
    SEARCH_SUCCESS,
    PAGE_LOAD
} from '../actions/article';

import articleRecordList from './articleRecordList';

export const defaultState = {
    maxPage: 0,
    dateRange: {
        min: 1000,
        max: new Date().getFullYear() + 1
    }
};

export default function articleSearchResult(state = defaultState, action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        const currentPage = action.response.currentPage;
        return {
            ...defaultState,
            currentPage,
            [currentPage]: articleRecordList(action.response.results, action),
            maxPage: action.response.maxPage,
            totalHits: action.response.totalHits,
            dateRange: action.response.dateRange
        };
    case SEARCH_TERM:
    case LIMIT_SEARCH:
    case RELOAD_HISTORY:
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
            [page]: articleRecordList(state[page], action)
        };
    }
}
