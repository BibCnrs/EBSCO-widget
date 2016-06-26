import {
    CHANGE_LIMITER,
    LINKED_SEARCH,
    LOGOUT
} from '../actions';

export const defaultState = {
    article: {
        fullText: true,
        publicationDate: {
            from: null,
            to: null
        },
        peerReviewed: false
    },
    publication: {
        peerReviewed: false
    }
};

const createLimiters = (category) => (state = defaultState[category], action) => {
    if(action.category !== category) {
        return state;
    }
    switch (action.type) {
    case CHANGE_LIMITER:
        return {
            ...state,
            [action.limiter]: action.value
        };
    case LOGOUT:
    case LINKED_SEARCH:
        return defaultState[category];
    default:
        return state;
    }
};

export default createLimiters;

export const getValue = (state, name) => state[name];
