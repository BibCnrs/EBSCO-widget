import {
    SEARCH_SUCCESS,
    LOGOUT
} from '../actions';

import parseFacetData from '../services/parseFacetData';

const defaultState = {};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        return parseFacetData(action.response.facets, action.response.activeFacets);
    case LOGOUT:
        return defaultState;
    default:
        return state;
    }
}
