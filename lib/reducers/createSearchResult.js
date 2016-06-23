import {
    SEARCH_SUCCESS,
    SEARCH_TERM,
    LIMIT_SEARCH,
    PAGE_LOAD,
    CHANGE_RESULTS_PER_PAGE,
    RELOAD_HISTORY,
    LOGOUT
} from '../actions';


export const defaultState = {
    maxPage: 0
};

const createSearchResult = (category) => (state = defaultState, action) => {
    if(action.category !== category) {
        return state;
    }

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
};



export default createSearchResult;

export const getCurrentPage = (state) => {
    return state[state.currentPage];
};

export const getPaginationData = (state) => {
    const records = getCurrentPage(state);
    const { totalHits, currentPage, maxPage } = state;
    const first = records && records[0] && records[0].id;
    const last = Array.isArray(records) && records.slice(-1)[0] && records.slice(-1)[0].id;

    return {
        first,
        last,
        totalHits,
        maxPage,
        currentPage
    };
};

export const getRecordByIndex = (state, index) => {
    const records = getCurrentPage(state);

    return records && records[index] || undefined;
};
