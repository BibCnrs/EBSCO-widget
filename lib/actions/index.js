export const LOADING = 'LOADING';
export const LOADED = 'LOADED';

export const SEARCH = 'SEARCH';
export const SEARCH_PENDING = 'SEARCH_PENDING';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const TERM_CHANGE = 'TERM_CHANGE';
export const DOMAIN_CHANGE = 'DOMAIN_CHANGE';
export const SEARCH_TERM = 'SEARCH_TERM';

export const GET_RESULT = 'GET_RESULT';

export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const LOGIN = 'LOGIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

export const SHOW_NOTICE = 'SHOW_NOTICE';
export const FETCH_NOTICE = 'FETCH_NOTICE';
export const RETRIEVE = 'RETRIEVE';
export const RETRIEVE_PENDING = 'RETRIEVE_PENDING';
export const RETRIEVE_SUCCESS = 'RETRIEVE_SUCCESS';
export const RETRIEVE_ERROR = 'RETRIEVE_ERROR';

export const SHOW_LIMITER = 'SHOW_LIMITER';
export const SHOW_MORE_LIMITER = 'SHOW_MORE_LIMITER';
export const CHANGE_LIMITER = 'CHANGE_LIMITER';
export const LIMIT_SEARCH = 'LIMIT_SEARCH';
export const RESET = 'RESET';

export const PAGE_LOAD = 'PAGE_LOAD';

export const SHOW_HISTORY = 'SHOW_HISTORY';
export const RELOAD_HISTORY = 'RELOAD_HISTORY';
export const DELETE_HISTORY = 'DELETE_HISTORY';
export const RESTORE_HISTORY = 'RESTORE_HISTORY';

export const SHOW_RESULT = 'SHOW_RESULT';

export const CHANGE_FACET = 'CHANGE_FACET';
export const APPLY_FACET = 'APPLY_FACET';
export const TRIGGER_EBSCO_ACTION = 'TRIGGER_EBSCO_ACTION';

export const CLEAR_ERROR = 'CLEAR_ERROR';

export const RETRIEVE_LINK = 'RETRIEVE_LINK';
export const RETRIEVE_LINK_PENDING = 'RETRIEVE_LINK_PENDING';
export const RETRIEVE_LINK_SUCCESS = 'RETRIEVE_LINK_SUCCESS';
export const RETRIEVE_LINK_ERROR = 'RETRIEVE_LINK_ERROR';

export const NAVIGATE = 'NAVIGATE';

export const FULLSCREEN = 'FULLSCREEN';

const changeTerm = (term) => ({
    type: TERM_CHANGE,
    term
});

const changeDomain = (domain) => ({
    type: DOMAIN_CHANGE,
    domain
});

const search = (url, token, query) => ({
    type: SEARCH,
    request: {
        url,
        config: {
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    },
    query
});

const searchTerm = () => ({
    type: SEARCH_TERM
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

const fetchNotice = (index) => ({
    type: FETCH_NOTICE,
    index
});

const retrieve = (index, url, token) => ({
    type: RETRIEVE,
    index,
    request: {
        url,
        config: {
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    }
});

const showNotice = (index, visibility) => ({
    type: SHOW_NOTICE,
    index,
    visibility
});

const limitSearch = () => ({
    type: LIMIT_SEARCH
});

const changeLimiter = (limiter, value) => ({
    type: CHANGE_LIMITER,
    limiter,
    value
});

const showLimiter = (visibility) => ({
    type: SHOW_LIMITER,
    visibility
});

const showMoreLimiter = (visibility) => ({
    type: SHOW_MORE_LIMITER,
    visibility
});

const reset = () => ({
    type: RESET
});

const loadPage = (page) => ({
    type: PAGE_LOAD,
    page
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

const changeFacet = (name, values) => ({
    type: CHANGE_FACET,
    name,
    values
});

const applyFacet = (name) => ({
    type: APPLY_FACET,
    name
});

const triggerEbscoAction = (value) => ({
    type: TRIGGER_EBSCO_ACTION,
    value
});

const clearError = () => ({
    type: CLEAR_ERROR
});

const retrieveLink = (url, domain, dbId, an, token, index) => ({
    type: RETRIEVE_LINK,
    index,
    request: {
        url: `${url}/${domain}/retrieve_pdf/${dbId}/${an}`,
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
    changeTerm,
    changeDomain,
    search,
    searchTerm,
    fetchNotice,
    retrieve,
    showNotice,
    submitLogin,
    login,
    forceLogin,
    logout,
    showLimiter,
    showMoreLimiter,
    reset,
    limitSearch,
    changeLimiter,
    loadPage,
    showResult,
    showHistory,
    reloadHistory,
    restoreHistory,
    deleteHistory,
    changeFacet,
    applyFacet,
    triggerEbscoAction,
    clearError,
    retrieveLink,
    navigate,
    setFullScreen
};
