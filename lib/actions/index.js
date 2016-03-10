import article, * as articleConstant from './article';
import publication, * as publicationConstant from './publication';

export const ARTICLE = articleConstant;
export const PUBLICATION = publicationConstant;

export const SET_AVAILABLE_DOMAINS = 'SET_AVAILABLE_DOMAINS';

export const SET_URL = 'SET_URL';
export const SET_HISTORY = 'SET_HISTORY';

export const LOADING = 'LOADING';
export const LOADED = 'LOADED';

export const GET_RESULT = 'GET_RESULT';

export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
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

export const RETRIEVE_LINK = 'RETRIEVE_LINK';
export const RETRIEVE_LINK_PENDING = 'RETRIEVE_LINK_PENDING';
export const RETRIEVE_LINK_SUCCESS = 'RETRIEVE_LINK_SUCCESS';
export const RETRIEVE_LINK_ERROR = 'RETRIEVE_LINK_ERROR';

export const NAVIGATE = 'NAVIGATE';

export const FULLSCREEN = 'FULLSCREEN';

const setUrl = (value) => ({
    type: SET_URL,
    value
});

const setHistory = (value) => ({
    type: SET_HISTORY,
    value
});

const setAvailableDomains = (value) => ({
    type: SET_AVAILABLE_DOMAINS,
    value
});

const submitLogin = (data) => ({
    type: SUBMIT_LOGIN,
    data
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

const retrieveLink = (url, domain, dbId, an, token, index) => ({
    type: RETRIEVE_LINK,
    index,
    request: {
        url: `${url}/${domain}/article/retrieve_pdf/${dbId}/${an}`,
        config: {
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    }
});

const navigate = (location) => ({
    type: NAVIGATE,
    location
});

const setFullScreen = (value) => ({
    type: FULLSCREEN,
    value
});
export default {
    article,
    publication,
    setUrl,
    setHistory,
    setAvailableDomains,
    submitLogin,
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
    retrieveLink,
    navigate,
    setFullScreen
};
