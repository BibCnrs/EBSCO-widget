import {
    ARTICLE,
    LOGOUT,
    RESTORE_HISTORY,
    RELOAD_HISTORY
} from '../actions';

import parseFacetData from '../services/parseFacetData';

export const defaultState = {};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case ARTICLE.SEARCH_SUCCESS:
        return parseFacetData(action.response.facets, action.response.activeFacets);
    case LOGOUT:
    case ARTICLE.RESET:
        return defaultState;
    case ARTICLE.CHANGE_FACET:
        return {
            ...state,
            [action.name]: {
                ...state[action.name],
                newValues: action.values
            }
        };
    case RESTORE_HISTORY:
    case RELOAD_HISTORY:
        return parseFacetData([], action.query.activeFacets);
    default:
        return state;
    }
}
