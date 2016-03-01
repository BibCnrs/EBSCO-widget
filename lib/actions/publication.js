export const CHANGE_TERM = 'PUBLICATION_CHANGE_TERM';
export const DOMAIN_CHANGE = 'PUBLICATION_DOMAIN_CHANGE';
export const SEARCH_TERM = 'PUBLICATION_SEARCH_TERM';

export const CHANGE_LIMITER = 'PUBLICATION_CHANGE_LIMITER';
export const LIMIT_SEARCH = 'PUBLICATION_LIMIT_SEARCH';

export const PAGE_LOAD = 'PUBLICATION_PAGE_LOAD';

export const SEARCH = 'PUBLICATION_SEARCH';
export const SEARCH_PENDING = 'PUBLICATION_SEARCH_PENDING';
export const SEARCH_SUCCESS = 'PUBLICATION_SEARCH_SUCCESS';
export const SEARCH_ERROR = 'PUBLICATION_SEARCH_ERROR';

export const CHANGE_FACET = 'PUBLICATION_CHANGE_FACET';
export const APPLY_FACET = 'PUBLICATION_APPLY_FACET';

export const RESET = 'PUBLICATION_RESET';

export const SHOW_NOTICE = 'PUBLICATION_SHOW_NOTICE';
export const FETCH_NOTICE = 'PUBLICATION_FETCH_NOTICE';
export const RETRIEVE = 'PUBLICATION_RETRIEVE';
export const RETRIEVE_PENDING = 'PUBLICATION_RETRIEVE_PENDING';
export const RETRIEVE_SUCCESS = 'PUBLICATION_RETRIEVE_SUCCESS';
export const RETRIEVE_ERROR = 'PUBLICATION_RETRIEVE_ERROR';

export const CHANGE_SORT = 'PUBLICATION_CHANGE_SORT';

export const CHANGE_FIELD = 'PUBLICATION_CHANGE_FIELD';

const changeTerm = (term) => ({
    type: CHANGE_TERM,
    term
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

const changeFacet = (name, values) => ({
    type: CHANGE_FACET,
    name,
    values
});

const applyFacet = (name) => ({
    type: APPLY_FACET,
    name
});

const reset = () => ({
    type: RESET
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

const changeSort = (value) => ({
    type: CHANGE_SORT,
    value
});

const changeField = (value) => ({
    type: CHANGE_FIELD,
    value
});

export default {
    changeTerm,
    changeDomain,
    searchTerm,
    limitSearch,
    changeLimiter,
    loadPage,
    search,
    changeFacet,
    applyFacet,
    reset,
    fetchNotice,
    retrieve,
    showNotice,
    changeSort,
    changeField
};
