'use strict';

export const SEARCH = 'SEARCH';
export const SEARCH_PENDING = 'SEARCH_PENDING';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const GET_RESULT = 'GET_RESULT';

const search = (term) => ({
    type: 'SEARCH',
    request: {
        url: `http://localhost:3000/search/${term}`,
        config: {}
    }
});

export default {
    search
};
