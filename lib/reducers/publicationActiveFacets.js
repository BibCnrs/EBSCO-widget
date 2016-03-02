import {
    PUBLICATION,
    LOGOUT
} from '../actions';

export const defaultState = [];

export default function search(state = defaultState, action) {
    switch (action.type) {
    case PUBLICATION.SEARCH_SUCCESS:
        return action.response.activeFacets || defaultState;

    case PUBLICATION.CHANGE_FACET:
        return {
            ...state,
            [action.name]: action.values
        };
    case LOGOUT:
    case PUBLICATION.RESET:
        return defaultState;
    default:
        return state;
    }
}