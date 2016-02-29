import {
    ARTICLE,
    LOGOUT
} from '../actions';
export const defaultState = [];

export default function search(state = defaultState, action) {
    switch (action.type) {
    case ARTICLE.SEARCH_SUCCESS:
        return action.response.activeFacets || defaultState;

    case ARTICLE.CHANGE_FACET:
        return {
            ...state,
            [action.name]: action.values
        };
    case LOGOUT:
    case ARTICLE.RESET:
        return defaultState;
    default:
        return state;
    }
}
