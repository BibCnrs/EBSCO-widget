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

import uncapitalizeKeys from '../services/uncapitalizeKeys';
import articleRecordList from './articleRecordList';

export const defaultState = {
    maxPage: 0,
    facets: [],
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
            ...state,
            currentPage,
            [currentPage]: articleRecordList(action.response.results, action),
            facets: uncapitalizeKeys(action.response.facets)  || [],
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
