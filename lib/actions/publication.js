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

export default {
    changeTerm,
    changeDomain,
    searchTerm,
    limitSearch,
    changeLimiter,
    loadPage,
    search
};
