export const DOMAIN_CHANGE = 'ARTICLE_DOMAIN_CHANGE';

export const CHANGE_QUERY = 'ARTICLE_CHANGE_QUERY';

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
    changeSort,
    addQuery,
    removeQuery,
    linkedSearch
};
