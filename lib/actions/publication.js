export const CHANGE_TERM = 'PUBLICATION_CHANGE_TERM';
export const DOMAIN_CHANGE = 'PUBLICATION_DOMAIN_CHANGE';

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
    changeSort,
    changeField
};
