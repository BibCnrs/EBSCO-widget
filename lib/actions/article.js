export const CHANGE_TERM = 'ARTICLE_CHANGE_TERM';
export const DOMAIN_CHANGE = 'ARTICLE_DOMAIN_CHANGE';
export const SEARCH_TERM = 'ARTICLE_SEARCH_TERM';

export const SHOW_MORE_LIMITER = 'ARTICLE_SHOW_MORE_LIMITER';
export const CHANGE_LIMITER = 'ARTICLE_CHANGE_LIMITER';
export const LIMIT_SEARCH = 'ARTICLE_LIMIT_SEARCH';

export const PAGE_LOAD = 'ARTICLE_PAGE_LOAD';

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

const showMoreLimiter = (visibility) => ({
    type: SHOW_MORE_LIMITER,
    visibility
});

const loadPage = (page) => ({
    type: PAGE_LOAD,
    page
});

export default {
    changeTerm,
    changeDomain,
    searchTerm,
    limitSearch,
    changeLimiter,
    showMoreLimiter,
    loadPage
};
