import {
    SEARCH_SUCCESS,
    LOGOUT
} from '../actions';

const defaultState = [];

export default function search(state = defaultState, action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        return action.response.facets;
    case LOGOUT:
        return defaultState;
    default:
        return state;
    }
}
