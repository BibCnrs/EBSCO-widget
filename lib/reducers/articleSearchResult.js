import {
    ARTICLE,
    RELOAD_HISTORY,
    TRIGGER_EBSCO_ACTION,
    LOGOUT
} from '../actions';

import articleRecordList from './articleRecordList';

export const defaultState = {
    maxPage: 0
};

export default function articleSearchResult(state = defaultState, action) {
    switch (action.type) {
    case ARTICLE.SEARCH_SUCCESS:
        const currentPage = action.response.currentPage;
        return {
            ...state,
            currentPage,
            [currentPage]: articleRecordList(action.response.results, action),
            maxPage: action.response.maxPage,
            totalHits: action.response.totalHits
        };
    case ARTICLE.SEARCH_TERM:
    case ARTICLE.LIMIT_SEARCH:
    case RELOAD_HISTORY:
    case LOGOUT:
    case TRIGGER_EBSCO_ACTION:
        return defaultState;
    case ARTICLE.PAGE_LOAD:
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
