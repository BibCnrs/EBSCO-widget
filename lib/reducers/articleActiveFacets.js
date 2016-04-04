import {
    ARTICLE,
    LOGOUT,
    RESTORE_HISTORY,
    RELOAD_HISTORY
} from '../actions';

export const defaultState = {};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case ARTICLE.SEARCH_SUCCESS:
        return action.response.activeFacets || defaultState;
    case LOGOUT:
    case ARTICLE.RESET:
        return defaultState;
    case ARTICLE.CHANGE_FACET:
        return {
            ...state,
            [action.name]: action.values
        };
    case RESTORE_HISTORY:
    case RELOAD_HISTORY:
        return action.query.activeFacets;
    default:
        return state;
    }
}
