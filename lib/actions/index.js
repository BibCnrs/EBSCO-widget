'use strict';

export const SEARCH = 'SEARCH';
export const SEARCH_PENDING = 'SEARCH_PENDING';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const TERM_CHANGE = 'TERM_CHANGE';
export const GET_RESULT = 'GET_RESULT';
export const SHOW_ABSTRACT = 'SHOW_ABSTRACT';

const changeTerm = (term) => ({
    type: TERM_CHANGE,
    term
});

const search = (url, term) => ({
    type: SEARCH,
    request: {
        url: `${url}/search/${term}`,
        config: {}
    }
});

const showAbstract = (index, visibility) => ({
    type: SHOW_ABSTRACT,
    index,
    visibility
});

export default {
    changeTerm,
    search,
    showAbstract
};
