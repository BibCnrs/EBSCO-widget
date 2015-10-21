'use strict';

export const SEARCH = 'SEARCH';
export const SEARCH_PENDING = 'SEARCH_PENDING';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const GET_RESULT = 'GET_RESULT';
export const SHOW_ABSTRACT = 'SHOW_ABSTRACT';

const search = (term) => ({
    type: SEARCH,
    request: {
        url: `http://localhost:3000/search/${term}`,
        config: {}
    }
});

const showAbstract = function (index, visibility) {
    return {
        type: SHOW_ABSTRACT,
        index,
        visibility
    };
};

export default {
    search,
    showAbstract
};
