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
export const SHOW_ABSTRACT = 'SHOW_ABSTRACT';

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
export const RESET_LIMITER = 'RESET_LIMITER';

export const OPEN_SEARCH = 'OPEN_SEARCH';

const openSearch = (value) => ({
    type: OPEN_SEARCH,
    value
});

const changeTerm = (term) => ({
    type: TERM_CHANGE,
    term
});

const changeDomain = (domain) => ({
    type: DOMAIN_CHANGE,
    domain
});

const search = (url, token) => {

    return {
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
        }
    };
};

const searchTerm = () => ({
    type: SEARCH_TERM
});

const showAbstract = (index, visibility) => ({
    type: SHOW_ABSTRACT,
    index,
    visibility
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

const retrieve = (index, dbId, an, url, token) => ({
    type: RETRIEVE,
    index,
    request: {
        url: `${url}/retrieve/${dbId}/${an}`,
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

const resetLimiter = () => ({
    type: RESET_LIMITER
});

export default {
    openSearch,
    changeTerm,
    changeDomain,
    search,
    searchTerm,
    showAbstract,
    fetchNotice,
    retrieve,
    showNotice,
    submitLogin,
    login,
    forceLogin,
    logout,
    showLimiter,
    showMoreLimiter,
    resetLimiter,
    limitSearch,
    changeLimiter
};
