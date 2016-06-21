import article, * as articleConstant from './article';
import publication, * as publicationConstant from './publication';
import a2z, * as a2zConstant from './a2z';

export const ARTICLE = articleConstant;
export const PUBLICATION = publicationConstant;
export const A2Z = a2zConstant;

export const SHOW_NOTICE = 'SHOW_NOTICE';
export const RETRIEVE = 'RETRIEVE';
export const RETRIEVE_PENDING = 'RETRIEVE_PENDING';
export const RETRIEVE_SUCCESS = 'RETRIEVE_SUCCESS';
export const RETRIEVE_ERROR = 'RETRIEVE_ERROR';

export const RETRIEVE_LINK = 'RETRIEVE_LINK';
export const RETRIEVE_LINK_PENDING = 'RETRIEVE_LINK_PENDING';
export const RETRIEVE_LINK_SUCCESS = 'RETRIEVE_LINK_SUCCESS';
export const RETRIEVE_LINK_ERROR = 'RETRIEVE_LINK_ERROR';

export const RESET = 'RESET';

export const SET_URL = 'SET_URL';
export const SET_DB_URL = 'SET_DB_URL';
export const SET_HISTORY = 'SET_HISTORY';

export const LOADING = 'LOADING';
export const LOADED = 'LOADED';

export const GET_RESULT = 'GET_RESULT';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const API_LOGIN = 'API_LOGIN';
export const API_LOGIN_PENDING = 'API_LOGIN_PENDING';
export const API_LOGIN_SUCCESS = 'API_LOGIN_SUCCESS';
export const API_LOGIN_ERROR = 'API_LOGIN_ERROR';

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

export const FETCH_DOMAINS = 'FETCH_DOMAINS';
export const FETCH_DOMAINS_SUCCESS = 'FETCH_DOMAINS_SUCCESS';
export const FETCH_DOMAINS_PENDING = 'FETCH_DOMAINS_PENDING';
export const FETCH_DOMAINS_ERROR = 'FETCH_DOMAINS_ERROR';

export const PAUSE_ACTION = 'PAUSE_ACTION';
export const SHOW_LOGIN = 'SHOW_LOGIN';
export const HIDE_LOGIN = 'HIDE_LOGIN';

export const ACCESS_ERROR = 'ACCESS_ERROR';

export const SELECT_RECORD = 'SELECT_RECORD';

const retrieve = (category, id, url, token) => ({
    type: RETRIEVE,
    category,
    id,
    request: {
        url,
        config: {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    }
});

// @TODO remove index
const showNotice = (category, id, index) => ({
    type: SHOW_NOTICE,
    category,
    id,
    index
});

const retrieveLink = (id, url, domain, dbId, an, token, articleIndex) => ({
    type: RETRIEVE_LINK,
    id,
    articleIndex,
    request: {
        url: `${url}/${domain}/article/retrieve_pdf/${dbId}/${an}`,
        config: {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    }
});

const reset = () => ({
    type: RESET
});

const setUrl = (value) => ({
    type: SET_URL,
    value
});

const setDbUrl = (value) => ({
    type: SET_DB_URL,
    value
});

const setHistory = (value) => ({
    type: SET_HISTORY,
    value
});

const login = (url) => ({
    type: LOGIN,
    request: {
        url: `${url}/getLogin`,
        config: {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    }
});

const apiLogin = (url, data) => ({
    type: API_LOGIN,
    request: {
        url: `${url}/login`,
        config: {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    }
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

const fetchDomains = (url) => ({
    type: FETCH_DOMAINS,
    request: {
        url: `${url}/domains`,
        config: {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    }
});

const showLogin = () => ({
    type: SHOW_LOGIN
});

const hideLogin = () => ({
    type: HIDE_LOGIN
});

const pauseAction = (action) => ({
    type: PAUSE_ACTION,
    action
});

const forbidAccess = (domain) => ({
    type: ACCESS_ERROR,
    error: {
        code: 401
    },
    domain
});

const selectRecord = (category, id) => ({
    type: SELECT_RECORD,
    category,
    id
});

export default {
    article,
    retrieve,
    showNotice,
    retrieveLink,
    publication,
    a2z,
    reset,
    setUrl,
    setDbUrl,
    setHistory,
    login,
    apiLogin,
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
    changeLanguage,
    fetchDomains,
    showLogin,
    hideLogin,
    pauseAction,
    forbidAccess,
    selectRecord
};
