import {
    TRIGGER_EBSCO_ACTION,
    LOGOUT
} from '../actions';

import {
    SEARCH_SUCCESS,
    SEARCH_TERM,
    LIMIT_SEARCH,
    PAGE_LOAD
} from '../actions/publication';

import publicationRecordList from './publicationRecordList';

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
            [currentPage]: publicationRecordList(action.response.results, action),
            maxPage: action.response.maxPage,
            totalHits: action.response.totalHits
        };
    case SEARCH_TERM:
    case LIMIT_SEARCH:
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
            [page]: publicationRecordList(state[page], action)
        };
    }
}
