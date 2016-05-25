export const DOMAIN_CHANGE = 'A2Z_DOMAIN_CHANGE';

export const PAGE_LOAD = 'A2Z_PAGE_LOAD';

export const SEARCH = 'A2Z_SEARCH';
export const SEARCH_PENDING = 'A2Z_SEARCH_PENDING';
export const SEARCH_SUCCESS = 'A2Z_SEARCH_SUCCESS';
export const SEARCH_ERROR = 'A2Z_SEARCH_ERROR';

export const SEARCH_TERM = 'A2Z_SEARCH_TERM';

export const SHOW_NOTICE = 'A2Z_SHOW_NOTICE';
export const RETRIEVE = 'A2Z_RETRIEVE';
export const RETRIEVE_PENDING = 'A2Z_RETRIEVE_PENDING';
export const RETRIEVE_SUCCESS = 'A2Z_RETRIEVE_SUCCESS';
export const RETRIEVE_ERROR = 'A2Z_RETRIEVE_ERROR';

const changeDomain = (domain) => ({
    type: DOMAIN_CHANGE,
    domain
});

const loadPage = (page) => ({
    type: PAGE_LOAD,
    page
});

const searchTerm = (queries) => ({
    type: SEARCH_TERM,
    queries
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

const retrieve = (publicationIndex, url, token) => ({
    type: RETRIEVE,
    publicationIndex,
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

const showNotice = (publicationIndex, visibility) => ({
    type: SHOW_NOTICE,
    publicationIndex,
    visibility
});

export default {
    changeDomain,
    loadPage,
    searchTerm,
    search,
    retrieve,
    showNotice
};
