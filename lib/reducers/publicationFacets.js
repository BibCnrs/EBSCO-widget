import {
    PUBLICATION,
    LOGOUT,
    RESTORE_HISTORY,
    RELOAD_HISTORY
} from '../actions';

import parseFacetData from '../services/parseFacetData';

export const defaultState = {};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case PUBLICATION.SEARCH_SUCCESS:
        return parseFacetData(action.response.facets, action.response.activeFacets);
    case LOGOUT:
    case PUBLICATION.RESET:
        return defaultState;
    case PUBLICATION.CHANGE_FACET:
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
