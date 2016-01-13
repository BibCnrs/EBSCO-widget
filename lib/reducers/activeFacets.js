import {
    SEARCH_SUCCESS,
    LOGOUT,
    RESET
} from '../actions';
export const defaultState = [];

export default function search(state = defaultState, action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        return action.response.activeFacets || defaultState;
    case LOGOUT:
    case RESET:
        return defaultState;
    default:
        return state;
    }
}
