'use strict';

export const SEARCH = 'SEARCH';
export const SEARCH_PENDING = 'SEARCH_PENDING';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const TERM_CHANGE = 'TERM_CHANGE';
export const GET_RESULT = 'GET_RESULT';
export const SHOW_ABSTRACT = 'SHOW_ABSTRACT';

export const LOGIN = 'LOGIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const SHOW_NOTICE = 'SHOW_NOTICE';
export const RETRIEVE = 'RETRIEVE';
export const RETRIEVE_PENDING = 'RETRIEVE_PENDING';
export const RETRIEVE_SUCCESS = 'RETRIEVE_SUCCESS';
export const RETRIEVE_ERROR = 'RETRIEVE_ERROR';

const changeTerm = (term) => ({
    type: TERM_CHANGE,
    term
});

const search = (url, term, token) => ({
    type: SEARCH,
    request: {
        url: `${url}/search/${term}`,
        config: {
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    }
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

export default {
    changeTerm,
    search,
    showAbstract,
    retrieve,
    showNotice,
    login
};
