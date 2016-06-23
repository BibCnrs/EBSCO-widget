export const DOMAIN_CHANGE = 'ARTICLE_DOMAIN_CHANGE';
export const SEARCH_TERM = 'ARTICLE_SEARCH_TERM';

export const CHANGE_QUERY = 'ARTICLE_CHANGE_QUERY';

export const CHANGE_LIMITER = 'ARTICLE_CHANGE_LIMITER';
export const LIMIT_SEARCH = 'ARTICLE_LIMIT_SEARCH';

export const PAGE_LOAD = 'ARTICLE_PAGE_LOAD';
export const CHANGE_RESULTS_PER_PAGE = 'ARTICLE_CHANGE_RESULTS_PER_PAGE';

export const SEARCH = 'ARTICLE_SEARCH';
export const SEARCH_PENDING = 'ARTICLE_SEARCH_PENDING';
export const SEARCH_SUCCESS = 'ARTICLE_SEARCH_SUCCESS';
export const SEARCH_ERROR = 'ARTICLE_SEARCH_ERROR';

export const CHANGE_SORT = 'ARTICLE_CHANGE_SORT';

export const ADD_QUERY = 'ARTICLE_ADD_QUERY';
export const REMOVE_QUERY = 'ARTICLE_REMOVE_QUERY';

export const LINKED_SEARCH = 'ARTICLE_LINKED_SEARCH';

const changeQuery = (value, key, index = 0) => ({
    type: CHANGE_QUERY,
    key,
    index,
    value
});

const changeDomain = (domain) => ({
    type: DOMAIN_CHANGE,
    domain
});

const searchTerm = () => ({
    type: SEARCH_TERM
});

const limitSearch = () => ({
    type: LIMIT_SEARCH
});

const changeLimiter = (limiter, value) => ({
    type: CHANGE_LIMITER,
    limiter,
    value
});

const loadPage = (page) => ({
    type: PAGE_LOAD,
    page
});

const changeResultsPerPage = (nbResults) => ({
    type: CHANGE_RESULTS_PER_PAGE,
    nbResults
});

const search = (url, token, query) => ({
    type: SEARCH,
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
    },
    query
});

const changeSort = (value) => ({
    type: CHANGE_SORT,
    value
});

const addQuery = (index) => ({
    type: ADD_QUERY,
    index
});

const removeQuery = (index) => ({
    type: REMOVE_QUERY,
    index
});

const linkedSearch = (term, field) => ({
    type: LINKED_SEARCH,
    term,
    field
});

export default {
    changeQuery,
    changeDomain,
    searchTerm,
    limitSearch,
    changeLimiter,
    loadPage,
    changeResultsPerPage,
    search,
    changeSort,
    addQuery,
    removeQuery,
    linkedSearch
};
