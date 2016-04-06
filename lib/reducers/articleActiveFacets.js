import _ from 'lodash';

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
    case ARTICLE.CLEAR_FACET:
    case ARTICLE.RESET:
        return defaultState;
    case ARTICLE.CHANGE_FACET:
        const { id, value, checked } = action;
        const prevValues = state[id] || [];
        const values = checked ?
            [ ...prevValues, value ]
        :
            _.without(prevValues, value)
        ;

        return {
            ...state,
            [id]: values
        };
    case RESTORE_HISTORY:
    case RELOAD_HISTORY:
        return action.query.activeFacets;
    default:
        return state;
    }
}
