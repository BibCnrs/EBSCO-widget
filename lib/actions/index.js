'use strict';

export const SEARCH = 'SEARCH';
export const SEARCH_PENDING = 'SEARCH_PENDING';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const TERM_CHANGE = 'TERM_CHANGE';
export const SEARCH_TERM = 'SEARCH_TERM';

export const GET_RESULT = 'GET_RESULT';
export const SHOW_ABSTRACT = 'SHOW_ABSTRACT';

export const LOGIN = 'LOGIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const SHOW_NOTICE = 'SHOW_NOTICE';
export const FETCH_NOTICE = 'FETCH_NOTICE';
export const RETRIEVE = 'RETRIEVE';
export const RETRIEVE_PENDING = 'RETRIEVE_PENDING';
export const RETRIEVE_SUCCESS = 'RETRIEVE_SUCCESS';
export const RETRIEVE_ERROR = 'RETRIEVE_ERROR';

export const FULLTEXT_CHANGE = 'FULLTEXT_CHANGE';
export const CHANGE_PUBLICATION_DATE = 'CHANGE_PUBLICATION_DATE';
export const LIMIT_PUBLICATION_DATE = 'LIMIT_PUBLICATION_DATE';
export const SHOW_LIMITER = 'SHOW_LIMITER';

export const OPEN_SEARCH = 'OPEN_SEARCH';

const openSearch = (value) => ({
    type: OPEN_SEARCH,
    value
});

const changeTerm = (term) => ({
    type: TERM_CHANGE,
    term
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

const limitFullText = (fullText) => ({
    type: FULLTEXT_CHANGE,
    fullText
});

const limitPublicationDate = (from, to) => ({
    type: LIMIT_PUBLICATION_DATE,
    from,
    to
});

const changePublicationDate = (from, to) => ({
    type: CHANGE_PUBLICATION_DATE,
    from,
    to
});

const showLimiter = (visibility) => ({
    type: SHOW_LIMITER,
    visibility
});

export default {
    openSearch,
    changeTerm,
    limitFullText,
    changePublicationDate,
    limitPublicationDate,
    search,
    searchTerm,
    showAbstract,
    fetchNotice,
    retrieve,
    showNotice,
    login,
    forceLogin,
    showLimiter
};
