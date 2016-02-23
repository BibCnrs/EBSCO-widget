export const CHANGE_TERM = 'ARTICLE_CHANGE_TERM';
export const DOMAIN_CHANGE = 'ARTICLE_DOMAIN_CHANGE';
export const SEARCH_TERM = 'ARTICLE_SEARCH_TERM';

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

export default {
    changeTerm,
    changeDomain,
    searchTerm
};
