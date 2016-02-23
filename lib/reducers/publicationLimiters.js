import {
    PUBLICATION,
    RESET,
    LOGOUT
} from '../actions';

export const defaultState = {
    peerReviewed: false
};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case PUBLICATION.CHANGE_LIMITER:
        return {
            ...state,
            [action.limiter]: action.value
        };
    case RESET:
    case LOGOUT:
        return defaultState;
    default:
        return state;
    }
}
