import {
    LOGIN_SUCCESS,
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
    CHANGE_LANGUAGE
} from '../actions';

export const defaultState = {
    limiterShown: true,
    loading: false,
    resultShown: false,
    historyShown: false,
    location: 'login',
    fullScreen: false,
    notice: null,
    language: 'fr'
};

export default function userInterface(state = defaultState, action) {
    switch (action.type) {
    case LOGIN_SUCCESS:
        return {
            ...state,
            location: 'article'
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
    case ARTICLE.SHOW_NOTICE:
    case PUBLICATION.SHOW_NOTICE:
        return {
            ...state,
            notice: action.visibility ? action.index : null
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
