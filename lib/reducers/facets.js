import {
    SEARCH_SUCCESS,
    LOGOUT,
    CHANGE_FACET,
    RESET,
    RESTORE_HISTORY,
    RELOAD_HISTORY
} from '../actions';

import parseFacetData from '../services/parseFacetData';

export const defaultState = {};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        return parseFacetData(action.response.facets, action.response.activeFacets);
    case LOGOUT:
    case RESET:
        return defaultState;
    case CHANGE_FACET:
        return {
            ...state,
            [action.name]: {
                ...state[action.name],
                values: action.newValues
            }
        };
    case RESTORE_HISTORY:
    case RELOAD_HISTORY:
        return parseFacetData([], action.query.activeFacets);
    default:
        return state;
    }
}
