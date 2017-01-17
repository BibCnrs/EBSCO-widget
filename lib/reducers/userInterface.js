import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
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
    HIDE_LOGIN,
    SHOW_PROFILE,
    HIDE_PROFILE,
    EXPORT_NOTICE_PENDING,
    EXPORT_NOTICE_SUCCESS,
    EXPORT_NOTICE_ERROR,
    INITIALIZE
} from '../actions';

export const defaultState = {
    limiterShown: true,
    resultShown: false,
    historyShown: false,
    location: 'article',
    fullScreen: false,
    language: 'fr',
    readOnlyLanguage: false,
    loginShown: false,
    profileShown: false,
    noticeBeingExported: []
};

export default function userInterface(state = defaultState, action) {
    switch (action.type) {
    case LOGIN_SUCCESS:
        if (action.response.favorite_domain && !action.response.domains.includes(action.response.favorite_domain)) {
            return {
                ...state,
                loginShown: false,
                profileShown: true,
            };
        }
        return {
            ...state,
            loginShown: false,
            profileShown: false,
        };
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
    case SHOW_PROFILE:
        return {
            ...state,
            profileShown: true
        };
    case HIDE_PROFILE:
        return {
            ...state,
            profileShown: false
        };
    case LOGOUT:
        return {
            ...defaultState,
            readOnlyLanguage: state.readOnlyLanguage,
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
    case EXPORT_NOTICE_PENDING:
        return {
            ...state,
            noticeBeingExported: action.ids
        };
    case EXPORT_NOTICE_SUCCESS:
    case EXPORT_NOTICE_ERROR:
    case INITIALIZE:
        if(action.location) {
            return {
                ...state,
                noticeBeingExported: [],
                language: action.language || defaultState.language,
                location: action.location,
                readOnlyLanguage: !!action.language,
            };
        }
        return {
            ...state,
            noticeBeingExported: [],
            language: action.language || defaultState.language,
            readOnlyLanguage: !!action.language,
        };
    default:
        return state;
    }
}

export const getLocation = (state) => state.location;
export const getLanguage = (state) => state.language;
export const isLanguageReadOnly = (state) => state.readOnlyLanguage;

export const isLoginShown = (state) => state.loginShown;
export const isProfileShown = (state) => state.profileShown;

export const isFullScreen = (state) => state.fullScreen;

export const isLimiterShown = (state) => state.limiterShown;

export const isResultShown = (state) => state.resultShown;

export const isHistoryShown = (state) => state.historyShown;
export const isExporting = (state) => state.noticeBeingExported.length > 0;
export const isExportingNotice = (state, id) => state.noticeBeingExported.indexOf(id) !== -1;
export const hasLimiterChanged = (state) => state.loading;
