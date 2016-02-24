import {
    ARTICLE,
    LOGOUT,
    RESET,
    CHANGE_FACET
} from '../actions';
export const defaultState = [];

export default function search(state = defaultState, action) {
    switch (action.type) {
    case ARTICLE.SEARCH_SUCCESS:
        return action.response.activeFacets || defaultState;

    case CHANGE_FACET:
        return {
            ...state,
            [action.name]: action.values.map(value => value.value)
        };
    case LOGOUT:
    case RESET:
        return defaultState;
    default:
        return state;
    }
}
