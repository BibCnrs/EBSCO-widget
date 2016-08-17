import {
    A2Z_SEARCH,
    CHANGE_LIMITER,
    LINKED_SEARCH,
    RELOAD_HISTORY,
    RESTORE_HISTORY,
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
    if(action.category !== category && action.type !== LOGOUT) {
        return state;
    }
    switch (action.type) {
    case CHANGE_LIMITER:
        return {
            ...state,
            [action.limiter]: action.value
        };
    case A2Z_SEARCH:
    case LOGOUT:
    case LINKED_SEARCH:
        return defaultState[category];
    case RELOAD_HISTORY:
    case RESTORE_HISTORY:
        return action.query.limiters;
    default:
        return state;
    }
};

export default createLimiters;

export const getValueByName = (state, name) => {
    if(!state) {
        return;
    }
    return state[name] || null;
};
