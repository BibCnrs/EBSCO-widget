import {
    API_LOGIN_SUCCESS,
    LOGIN,
    LOGOUT,
    LOADING,
    LOADED,
    SHOW_SIDEBAR,
    ARTICLE,
    PUBLICATION,
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
    showLogin: false
};

export default function userInterface(state = defaultState, action) {
    switch (action.type) {
    case API_LOGIN_SUCCESS:
    case LOGIN:
        return {
            ...state,
            showLogin: false
        };
    case SHOW_LOGIN:
        return {
            ...state,
            showLogin: true
        };
    case HIDE_LOGIN:
        return {
            ...state,
            showLogin: false
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
    case ARTICLE.SEARCH_SUCCESS:
    case PUBLICATION.SEARCH_SUCCESS:
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
    case ARTICLE.LINKED_SEARCH:
        return {
            ...state,
            notice: null
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
