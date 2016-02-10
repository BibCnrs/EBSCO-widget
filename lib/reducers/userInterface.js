import {
    SEARCH_PENDING,
    LOGIN_PENDING,
    OPEN_SEARCH,
    LOGOUT,
    LOADING,
    LOADED,
    SHOW_LIMITER,
    SHOW_MORE_LIMITER,
    CHANGE_LIMITER,
    LIMIT_SEARCH,
    SHOW_HISTORY,
    RELOAD_HISTORY,
    RESTORE_HISTORY,
    SHOW_NOTICE,
    RESET
} from '../actions';

export const defaultState = {
    open: false,
    limiterShown: true,
    limiterMoreShown: true,
    limiterHasChanged: false,
    loading: false,
    historyShown: false,
    notice: null
};

export default function open(state = defaultState, action) {
    switch (action.type) {
    case LOGIN_PENDING:
    case SEARCH_PENDING:
        return {
            ...state,
            open: true
        };
    case OPEN_SEARCH:
        return {
            ...state,
            open: action.value
        };
    case LOGOUT:
        return defaultState;
    case LOADING:
        return {
            ...state,
            loading: true
        };
    case LOADED:
        return {
            ...state,
            loading: false
        };
    case SHOW_LIMITER:
        return {
            ...state,
            limiterShown: action.visibility
        };
    case SHOW_MORE_LIMITER:
        return {
            ...state,
            limiterMoreShown: action.visibility
        };
    case RESET:
    case CHANGE_LIMITER:
        return {
            ...state,
            limiterHasChanged: true
        };
    case LIMIT_SEARCH:
        return {
            ...state,
            limiterHasChanged: false
        };
    case SHOW_HISTORY:
        return {
            ...state,
            historyShown: action.visibility
        };
    case RELOAD_HISTORY:
    case RESTORE_HISTORY:
        return {
            ...state,
            historyShown: false,
            limiterShown: true
        };
    case SHOW_NOTICE:
        return {
            ...state,
            notice: action.visibility ? action.index : null
        };
    default:
        return state;
    }
}
