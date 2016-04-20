import article, * as articleConstant from './article';
import publication, * as publicationConstant from './publication';
import a2z, * as a2zConstant from './a2z';

export const ARTICLE = articleConstant;
export const PUBLICATION = publicationConstant;
export const A2Z = a2zConstant;

export const RESET = 'RESET';

export const SET_URL = 'SET_URL';
export const SET_HISTORY = 'SET_HISTORY';

export const LOADING = 'LOADING';
export const LOADED = 'LOADED';

export const GET_RESULT = 'GET_RESULT';

export const LOGIN = 'LOGIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

export const SHOW_SIDEBAR = 'SHOW_SIDEBAR';

export const SHOW_HISTORY = 'SHOW_HISTORY';
export const RELOAD_HISTORY = 'RELOAD_HISTORY';
export const DELETE_HISTORY = 'DELETE_HISTORY';
export const RESTORE_HISTORY = 'RESTORE_HISTORY';

export const SHOW_RESULT = 'SHOW_RESULT';

export const CLEAR_ERROR = 'CLEAR_ERROR';

export const NAVIGATE = 'NAVIGATE';

export const FULLSCREEN = 'FULLSCREEN';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

const reset = () => ({
    type: RESET
});

const setUrl = (value) => ({
    type: SET_URL,
    value
});

const setHistory = (value) => ({
    type: SET_HISTORY,
    value
});

const login = (url, data) => ({
    type: LOGIN,
    request: {
        url: `${url}/login`,
        config: {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    }
});

const forceLogin = (token) => ({
    type: LOGIN_SUCCESS,
    response: { token: token }
});

const logout = () => ({
    type: LOGOUT
});

const showSidebar = (visibility) => ({
    type: SHOW_SIDEBAR,
    visibility
});

const showResult = (visibility) => ({
    type: SHOW_RESULT,
    visibility
});

const showHistory = (visibility) => ({
    type: SHOW_HISTORY,
    visibility
});

const reloadHistory = (query) => ({
    type: RELOAD_HISTORY,
    query
});

const restoreHistory = (query) => ({
    type: RESTORE_HISTORY,
    query
});

const deleteHistory = (query) => ({
    type: DELETE_HISTORY,
    query
});

const clearError = () => ({
    type: CLEAR_ERROR
});

const navigate = (location) => ({
    type: NAVIGATE,
    location
});

const setFullScreen = (value) => ({
    type: FULLSCREEN,
    value
});

const changeLanguage = (value) => ({
    type: CHANGE_LANGUAGE,
    value
});

export default {
    article,
    publication,
    a2z,
    reset,
    setUrl,
    setHistory,
    login,
    forceLogin,
    logout,
    showSidebar,
    showResult,
    showHistory,
    reloadHistory,
    restoreHistory,
    deleteHistory,
    clearError,
    navigate,
    setFullScreen,
    changeLanguage
};
