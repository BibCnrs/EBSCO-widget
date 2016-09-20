import {
    LOGOUT,
    INITIALIZE,
    SEARCH,
    EXACT_MATCH_SEARCH_SUCCESS
} from '../actions';

export const defaultState = {
    publication: null,
    notice: null
};

const exactMatch = (state = defaultState, action) => {

    switch (action.type) {
    case SEARCH:
    case LOGOUT:
        return defaultState;
    case INITIALIZE:
        return {
            ...state,
            status: 'NONE'
        };
    case EXACT_MATCH_SEARCH_SUCCESS:
        return {
            ...state,
            publication: action.response.results[0]
        };
    default:
        return state;
    }
};

export default exactMatch;

export const getSearchValueByName = (state, name) => state[name];
export const getSearchResultsPerPage = (state) => getSearchValueByName(state, 'resultsPerPage');
export const getSearchSort = (state) => getSearchValueByName(state, 'sort');
export const getSearchDateRange = (state) => getSearchValueByName(state, 'dateRange') || { min: 0, max: 9999 };
export const getSearchStatus = (state) => getSearchValueByName(state, 'status');
export const isSearchInA2zMode = (state) => state.sort === 'relevance';
