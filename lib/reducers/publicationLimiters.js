import {
    PUBLICATION,
    LOGOUT
} from '../actions';

import {
    CHANGE_LIMITER
} from '../actions/publication';

export const defaultState = {
    peerReviewedPublication: false
};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case CHANGE_LIMITER:
        return {
            ...state,
            [action.limiter]: action.value
        };
    case LOGOUT:
        return defaultState;
    default:
        return state;
    }
}
