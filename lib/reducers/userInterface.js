import {
    API_LOGIN_SUCCESS,
    API_LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
    LOADING,
    LOADED,
    SEARCH_SUCCESS,
    SHOW_SIDEBAR,
    SHOW_HISTORY,
    RELOAD_HISTORY,
    RESTORE_HISTORY,
    SHOW_RESULT,
    NAVIGATE,
    FULLSCREEN,
    CHANGE_LANGUAGE,
    SHOW_LOGIN,
    HIDE_LOGIN
} from '../actions';

export const defaultState = {
    limiterShown: true,
    loading: false,
    resultShown: false,
    historyShown: false,
    location: 'a2z',
    fullScreen: false,
    language: 'fr',
    loginShown: false
};

export default function userInterface(state = defaultState, action) {
    switch (action.type) {
    case API_LOGIN_SUCCESS:
    case LOGIN_SUCCESS:
    case API_LOGIN_ERROR:
    case LOGIN_ERROR:
        return {
            ...state,
            loginShown: false
        };
    case SHOW_LOGIN:
        return {
            ...state,
            loginShown: true
        };
    case HIDE_LOGIN:
        return {
            ...state,
            loginShown: false
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
    case SHOW_SIDEBAR:
        return {
            ...state,
            limiterShown: action.visibility
        };
    case SHOW_HISTORY:
        return {
            ...state,
            historyShown: action.visibility
        };
    case SHOW_RESULT:
        return {
            ...state,
            resultShown: action.visibility
        };
    case SEARCH_SUCCESS:
        return {
            ...state,
            resultShown: true
        };
    case RELOAD_HISTORY:
    case RESTORE_HISTORY:
        return {
            ...state,
            historyShown: false,
            limiterShown: true
        };
    case NAVIGATE:
        return {
            ...state,
            location: action.location
        };
    case FULLSCREEN:
        return {
            ...state,
            fullScreen: action.value
        };
    case CHANGE_LANGUAGE:
        return {
            ...state,
            language: action.value
        };
    default:
        return state;
    }
}

export const getLocation = (state) => state.location;
export const getLanguage = (state) => state.language;

export const isLoginShown = (state) => state.loginShown;

export const isFullScreen = (state) => state.fullScreen;

export const isLimiterShown = (state) => state.limiterShown;

export const isResultShown = (state) => state.resultShown;

export const isHistoryShown = (state) => state.historyShown;
export const isLoading = (state) => state.loading;
export const hasLimiterChanged = (state) => state.loading;
