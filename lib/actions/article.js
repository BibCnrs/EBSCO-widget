export const DOMAIN_CHANGE = 'ARTICLE_DOMAIN_CHANGE';
export const SEARCH_TERM = 'ARTICLE_SEARCH_TERM';

export const CHANGE_QUERY = 'ARTICLE_CHANGE_QUERY';

export const CHANGE_LIMITER = 'ARTICLE_CHANGE_LIMITER';
export const LIMIT_SEARCH = 'ARTICLE_LIMIT_SEARCH';

export const PAGE_LOAD = 'ARTICLE_PAGE_LOAD';

export const SEARCH = 'ARTICLE_SEARCH';
export const SEARCH_PENDING = 'ARTICLE_SEARCH_PENDING';
export const SEARCH_SUCCESS = 'ARTICLE_SEARCH_SUCCESS';
export const SEARCH_ERROR = 'ARTICLE_SEARCH_ERROR';

export const CHANGE_FACET = 'ARTICLE_CHANGE_FACET';
export const CLEAR_FACET = 'ARTICLE_CLEAR_FACET';
export const APPLY_FACET = 'ARTICLE_APPLY_FACET';

export const SHOW_NOTICE = 'ARTICLE_SHOW_NOTICE';
export const RETRIEVE = 'ARTICLE_RETRIEVE';
export const RETRIEVE_PENDING = 'ARTICLE_RETRIEVE_PENDING';
export const RETRIEVE_SUCCESS = 'ARTICLE_RETRIEVE_SUCCESS';
export const RETRIEVE_ERROR = 'ARTICLE_RETRIEVE_ERROR';

export const CHANGE_SORT = 'ARTICLE_CHANGE_SORT';

export const ADD_QUERY = 'ARTICLE_ADD_QUERY';
export const REMOVE_QUERY = 'ARTICLE_REMOVE_QUERY';

export const LINKED_SEARCH = 'ARTICLE_LINKED_SEARCH';

export const RETRIEVE_LINK = 'ARTICLE_RETRIEVE_LINK';
export const RETRIEVE_LINK_PENDING = 'ARTICLE_RETRIEVE_LINK_PENDING';
export const RETRIEVE_LINK_SUCCESS = 'ARTICLE_RETRIEVE_LINK_SUCCESS';
export const RETRIEVE_LINK_ERROR = 'ARTICLE_RETRIEVE_LINK_ERROR';

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

const changeFacet = (id, value, checked) => ({
    type: CHANGE_FACET,
    id,
    value,
    checked
});

const clearFacet = () => ({
    type: CLEAR_FACET
});

const applyFacet = (name) => ({
    type: APPLY_FACET,
    name
});

const retrieve = (articleIndex, url, token) => ({
    type: RETRIEVE,
    articleIndex,
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
    }
});

const showNotice = (articleIndex, visibility) => ({
    type: SHOW_NOTICE,
    articleIndex,
    visibility
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

const retrieveLink = (url, domain, dbId, an, token, articleIndex) => ({
    type: RETRIEVE_LINK,
    articleIndex,
    request: {
        url: `${url}/${domain}/article/retrieve_pdf/${dbId}/${an}`,
        config: {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    }
});

export default {
    changeQuery,
    changeDomain,
    searchTerm,
    limitSearch,
    changeLimiter,
    loadPage,
    search,
    changeFacet,
    clearFacet,
    applyFacet,
    retrieve,
    showNotice,
    changeSort,
    addQuery,
    removeQuery,
    linkedSearch,
    retrieveLink
};
