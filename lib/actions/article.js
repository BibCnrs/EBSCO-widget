export const CHANGE_TERM = 'ARTICLE_CHANGE_TERM';
export const DOMAIN_CHANGE = 'ARTICLE_DOMAIN_CHANGE';
export const SEARCH_TERM = 'ARTICLE_SEARCH_TERM';

export const SHOW_MORE_LIMITER = 'ARTICLE_SHOW_MORE_LIMITER';
export const CHANGE_LIMITER = 'ARTICLE_CHANGE_LIMITER';
export const LIMIT_SEARCH = 'ARTICLE_LIMIT_SEARCH';

export const PAGE_LOAD = 'ARTICLE_PAGE_LOAD';

export const SEARCH = 'ARTICLE_SEARCH';
export const SEARCH_PENDING = 'ARTICLE_SEARCH_PENDING';
export const SEARCH_SUCCESS = 'ARTICLE_SEARCH_SUCCESS';
export const SEARCH_ERROR = 'ARTICLE_SEARCH_ERROR';

export const CHANGE_FACET = 'ARTICLE_CHANGE_FACET';
export const APPLY_FACET = 'ARTICLE_APPLY_FACET';

export const RESET = 'ARTICLE_RESET';

export const SHOW_NOTICE = 'ARTICLE_SHOW_NOTICE';
export const FETCH_NOTICE = 'ARTICLE_FETCH_NOTICE';
export const RETRIEVE = 'ARTICLE_RETRIEVE';
export const RETRIEVE_PENDING = 'ARTICLE_RETRIEVE_PENDING';
export const RETRIEVE_SUCCESS = 'ARTICLE_RETRIEVE_SUCCESS';
export const RETRIEVE_ERROR = 'ARTICLE_RETRIEVE_ERROR';

export const CHANGE_SORT = 'ARTICLE_CHANGE_SORT';

export const CHANGE_FIELD_TYPE = 'ARTICLE_CHANGE_FIELD_TYPE';

export const ADD_FIELD = 'ARTICLE_ADD_FIELD';
export const REMOVE_FIELD = 'ARTICLE_REMOVE_FIELD';

export const CHANGE_FIELD_BOOLEAN = 'ARTICLE_CHANGE_FIELD_BOOLEAN';

const changeTerm = (term, index = 0) => ({
    type: CHANGE_TERM,
    index,
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

const showMoreLimiter = (visibility) => ({
    type: SHOW_MORE_LIMITER,
    visibility
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

const changeFieldType = (value, index = 0) => ({
    type: CHANGE_FIELD_TYPE,
    index,
    value
});

const addField = () => ({
    type: ADD_FIELD
});

const removeField = () => ({
    type: REMOVE_FIELD
});

const changeFieldBoolean = (value, index = 0) => ({
    type: CHANGE_FIELD_BOOLEAN,
    index,
    value
});

export default {
    changeTerm,
    changeDomain,
    searchTerm,
    limitSearch,
    changeLimiter,
    showMoreLimiter,
    loadPage,
    search,
    changeFacet,
    applyFacet,
    reset,
    fetchNotice,
    retrieve,
    showNotice,
    changeSort,
    changeFieldType,
    addField,
    removeField,
    changeFieldBoolean
};
