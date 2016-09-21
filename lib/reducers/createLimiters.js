import {
    A2Z_SEARCH,
    CHANGE_LIMITER,
    LINKED_SEARCH,
    RELOAD_HISTORY,
    RESTORE_HISTORY,
    LOGOUT,
    EXACT_MATCH_SEARCH
} from '../actions';

const createLimiters = (category, defaultState = {}) => (state = defaultState, action) => {
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
        return defaultState;
    case RELOAD_HISTORY:
    case RESTORE_HISTORY:
        return action.query.limiters;
    case EXACT_MATCH_SEARCH:
        return {
            ...state,
            publicationId: {
                label: action.label,
                value: action.value
            }
        };
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
