export const DOMAIN_CHANGE = 'A2Z_DOMAIN_CHANGE';

export const PAGE_LOAD = 'A2Z_PAGE_LOAD';
export const CHANGE_RESULTS_PER_PAGE = 'A2Z_CHANGE_RESULTS_PER_PAGE';

export const SEARCH = 'A2Z_SEARCH';
export const SEARCH_PENDING = 'A2Z_SEARCH_PENDING';
export const SEARCH_SUCCESS = 'A2Z_SEARCH_SUCCESS';
export const SEARCH_ERROR = 'A2Z_SEARCH_ERROR';

export const SEARCH_TERM = 'A2Z_SEARCH_TERM';

const changeDomain = (domain) => ({
    type: DOMAIN_CHANGE,
    domain
});

const loadPage = (page) => ({
    type: PAGE_LOAD,
    page
});

const changeResultsPerPage = (nbResults) => ({
    type: CHANGE_RESULTS_PER_PAGE,
    nbResults
});

const searchTerm = (firstLetter, secondLetter) => ({
    type: SEARCH_TERM,
    firstLetter,
    secondLetter
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
    changeDomain,
    loadPage,
    changeResultsPerPage,
    searchTerm,
    search
};
