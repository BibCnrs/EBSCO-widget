import _ from 'lodash';

import {
    PUBLICATION,
    LOGOUT
} from '../actions';

export const defaultState = {};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case PUBLICATION.SEARCH_SUCCESS:
        return action.response.activeFacets || defaultState;
    case LOGOUT:
    case PUBLICATION.CLEAR_FACET:
        return defaultState;
    case PUBLICATION.CHANGE_FACET:
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
    default:
        return state;
    }
}
