import _ from 'lodash';

export const INITIALIZE = 'INITIALIZE';
export const SET_ALL_DOMAINS = 'SET_ALL_DOMAINS';
export const SHOW_NOTICE = 'SHOW_NOTICE';
export const RETRIEVE = 'RETRIEVE';
export const RETRIEVE_PENDING = 'RETRIEVE_PENDING';
export const RETRIEVE_SUCCESS = 'RETRIEVE_SUCCESS';
export const RETRIEVE_ERROR = 'RETRIEVE_ERROR';
export const RETRIEVE_CANCEL = 'RETRIEVE_CANCEL';

export const RETRIEVE_LINK = 'RETRIEVE_LINK';
export const RETRIEVE_LINK_PENDING = 'RETRIEVE_LINK_PENDING';
export const RETRIEVE_LINK_SUCCESS = 'RETRIEVE_LINK_SUCCESS';
export const RETRIEVE_LINK_ERROR = 'RETRIEVE_LINK_ERROR';

export const RESET = 'RESET';

export const SET_URL = 'SET_URL';
export const SET_DB_URL = 'SET_DB_URL';
export const SET_HISTORY = 'SET_HISTORY';

export const GET_RESULT = 'GET_RESULT';

export const API_LOGIN = 'API_LOGIN';
export const RENATER_LOGIN = 'RENATER_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_CANCEL = 'LOGIN_CANCEL';

export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_AUTHENTICATION_MODE = 'CHANGE_AUTHENTICATION_MODE';
export const LOGOUT = 'LOGOUT';

export const SHOW_SIDEBAR = 'SHOW_SIDEBAR';

export const SHOW_HISTORY = 'SHOW_HISTORY';
export const RELOAD_HISTORY = 'RELOAD_HISTORY';
export const DELETE_HISTORY = 'DELETE_HISTORY';
export const RESTORE_HISTORY = 'RESTORE_HISTORY';

export const SHOW_RESULT = 'SHOW_RESULT';

export const CLEAR_ERROR = 'CLEAR_ERROR';

export const NAVIGATE = 'NAVIGATE';

export const FULLSCREEN = 'FULLSCREEN';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

export const FETCH_DOMAINS = 'FETCH_DOMAINS';
export const FETCH_DOMAINS_SUCCESS = 'FETCH_DOMAINS_SUCCESS';
export const FETCH_DOMAINS_PENDING = 'FETCH_DOMAINS_PENDING';
export const FETCH_DOMAINS_ERROR = 'FETCH_DOMAINS_ERROR';

export const PAUSE_ACTION = 'PAUSE_ACTION';
export const SHOW_LOGIN = 'SHOW_LOGIN';
export const HIDE_LOGIN = 'HIDE_LOGIN';

export const ACCESS_ERROR = 'ACCESS_ERROR';

export const SELECT_RECORD = 'SELECT_RECORD';
export const SELECT_PAGE = 'SELECT_PAGE';


export const CHANGE_FACET = 'CHANGE_FACET';
export const CLEAR_FACET = 'CLEAR_FACET';
export const APPLY_FACET = 'APPLY_FACET';

export const TRIGGER_SEARCH = 'TRIGGER_SEARCH';
export const SEARCH = 'SEARCH';
export const SEARCH_PENDING = 'SEARCH_PENDING';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_CANCEL = 'SEARCH_CANCEL';

export const PAGE_LOAD = 'PAGE_LOAD';
export const CHANGE_RESULTS_PER_PAGE = 'CHANGE_RESULTS_PER_PAGE';
export const SEARCH_TERM = 'SEARCH_TERM';

export const SEARCH_LETTERS = 'SEARCH_LETTERS';

export const CHANGE_LIMITER = 'CHANGE_LIMITER';
export const LIMIT_SEARCH = 'LIMIT_SEARCH';

export const DOMAIN_CHANGE = 'DOMAIN_CHANGE';

export const CHANGE_SORT = 'CHANGE_SORT';

export const CHANGE_TERM = 'CHANGE_TERM';

export const CHANGE_FIELD = 'CHANGE_FIELD';

export const CHANGE_QUERY = 'CHANGE_QUERY';

export const ADD_QUERY = 'ADD_QUERY';
export const REMOVE_QUERY = 'REMOVE_QUERY';

export const LINKED_SEARCH = 'LINKED_SEARCH';

export const EXPORT_NOTICE = 'EXPORT_NOTICE';
export const EXPORT_NOTICE_PENDING = 'EXPORT_NOTICE_PENDING';
export const EXPORT_NOTICE_SUCCESS = 'EXPORT_NOTICE_SUCCESS';
export const EXPORT_NOTICE_ERROR = 'EXPORT_NOTICE_ERROR';

export const BATCH_RETRIEVE = 'BATCH_RETRIEVE';
export const BATCH_RETRIEVE_SUCCESS = 'BATCH_RETRIEVE_SUCCESS';
export const BATCH_RETRIEVE_PENDING = 'BATCH_RETRIEVE_PENDING';
export const BATCH_RETRIEVE_ERROR = 'BATCH_RETRIEVE_ERROR';

export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_PENDING = 'FETCH_PENDING';
export const FETCH_ERROR = 'FETCH_ERROR';
export const FETCH_CANCEL = 'FETCH_CANCEL';
export const ERROR = 'ERROR';

const initialize = (domain) => ({
    type: INITIALIZE,
    domain
});

const setAllDomains = (domains) => ({
    type: SET_ALL_DOMAINS,
    domains
});

const retrieve = (category, id) => ({
    type: RETRIEVE,
    category,
    id
});

const batchRetrieve = (ids) => ({
    type: BATCH_RETRIEVE,
    ids
});

const batchRetrieveSuccess = (response) => ({
    type: BATCH_RETRIEVE_SUCCESS,
    category: 'article',
    response
});

const batchRetrieveError = (error) => ({
    type: BATCH_RETRIEVE,
    category: 'article',
    error
});

// @TODO remove index
const showNotice = (category, id) => ({
    type: SHOW_NOTICE,
    category,
    id
});

const retrieveLink = (id) => ({
    type: RETRIEVE_LINK,
    id
});

const reset = () => ({
    type: RESET
});

const setUrl = (value) => ({
    type: SET_URL,
    value
});

const setDbUrl = (value) => ({
    type: SET_DB_URL,
    value
});

const setHistory = (value) => ({
    type: SET_HISTORY,
    value
});

const apiLogin = () => ({
    type: API_LOGIN
});

const loginRenater = () => ({
    type: RENATER_LOGIN
});

const loginPending = () => ({
    type: LOGIN_PENDING
});

const loginSuccess = (response) => ({
    type: LOGIN_SUCCESS,
    response
});

const loginError = (error) => ({
    type: LOGIN_ERROR,
    error
});

const loginCancel = () => ({
    type: LOGIN_CANCEL
});

const changeUsername = (value) => ({
    type: CHANGE_USERNAME,
    value
});

const changePassword = (value) => ({
    type: CHANGE_PASSWORD,
    value
});

const changeAuthenticationMode = (value) => ({
    type: CHANGE_AUTHENTICATION_MODE,
    value
});

const logout = () => ({
    type: LOGOUT
});

const showSidebar = (visibility) => ({
    type: SHOW_SIDEBAR,
    visibility
});

const showResult = (visibility) => ({
    type: SHOW_RESULT,
    visibility
});

const showHistory = (visibility) => ({
    type: SHOW_HISTORY,
    visibility
});

const reloadHistory = (query) => ({
    type: RELOAD_HISTORY,
    category: 'article',
    query
});

const restoreHistory = (query) => ({
    type: RESTORE_HISTORY,
    category: 'article',
    query
});

const deleteHistory = (query) => ({
    type: DELETE_HISTORY,
    query
});

const clearError = () => ({
    type: CLEAR_ERROR
});

const navigate = (location) => ({
    type: NAVIGATE,
    location
});

const setFullScreen = (value) => ({
    type: FULLSCREEN,
    value
});

const changeLanguage = (value) => ({
    type: CHANGE_LANGUAGE,
    value
});

const showLogin = () => ({
    type: SHOW_LOGIN
});

const hideLogin = () => ({
    type: HIDE_LOGIN
});

const pauseAction = (action) => ({
    type: PAUSE_ACTION,
    action
});

const forbidAccess = (domain) => ({
    type: ACCESS_ERROR,
    error: {
        code: 401
    },
    domain
});

const selectRecord = (category, id) => ({
    type: SELECT_RECORD,
    category,
    id
});

const selectPage = (category, first, last) => ({
    type: SELECT_PAGE,
    category,
    ids: _.range(first, last + 1)
});

const changeFacet = (category, id, value, checked) => ({
    type: CHANGE_FACET,
    category,
    id,
    value,
    checked
});

const clearFacet = (category) => ({
    type: CLEAR_FACET,
    category
});

const applyFacet = (category, name) => ({
    type: APPLY_FACET,
    category,
    name
});

const searchTerm = (category) => ({
    type: SEARCH_TERM,
    category
});

const limitSearch = (category) => ({
    type: LIMIT_SEARCH,
    category
});

const changeLimiter = (category, limiter, value) => ({
    type: CHANGE_LIMITER,
    category,
    limiter,
    value
});

const loadPage = (category, page) => ({
    type: PAGE_LOAD,
    category,
    page
});

const changeResultsPerPage = (category, nbResults) => ({
    type: CHANGE_RESULTS_PER_PAGE,
    category,
    nbResults
});

const search = (category) => ({
    type: SEARCH,
    category
});

const triggerSearch = (category) => ({
    type: TRIGGER_SEARCH,
    category
});

const changeDomain = (category, domain) => ({
    type: DOMAIN_CHANGE,
    category,
    domain
});

const changeSort = (category, value) => ({
    type: CHANGE_SORT,
    category,
    value
});

const changeQuery = (category, value, key, index = 0) => ({
    type: CHANGE_QUERY,
    category,
    key,
    index,
    value
});

const changeTerm = (category, value, index = 0) => changeQuery(category, value, 'term', index);

const changeField = (category, value, index = 0) => changeQuery(category, value, 'field', index);

export const getTerm = (firstLetter, secondLetter) => {
    if(firstLetter === '') {
        return [''];
    }
    const firstLetters = firstLetter === '#' ? _.range(10) : [firstLetter];
    const secondLetters = secondLetter === '#' ? _.range(10) : [secondLetter];

    return firstLetters.reduce((result, letter1) => {
        return [
            ...result,
            ...secondLetters.map((letter2) => {
                return `${letter1}${letter2}*`;
            })
        ];
    }, []).join(' OR ');

};

const changeLetters = (firstLetter, secondLetter) => (changeQuery('a2z', getTerm(firstLetter, secondLetter), 'term', 0));

const addQuery = (index) => ({
    type: ADD_QUERY,
    category: 'article',
    index
});

const removeQuery = (index) => ({
    type: REMOVE_QUERY,
    category: 'article',
    index
});

const linkedSearch = (term, field) => ({
    type: LINKED_SEARCH,
    category: 'article',
    term,
    field
});

const exportNotice = (category, ids) => ({
    type: EXPORT_NOTICE,
    category,
    ids
});

const exportNoticePending = (ids) => ({
    type: EXPORT_NOTICE_PENDING,
    category: 'article',
    ids
});

const exportNoticeSuccess = () => ({
    type: EXPORT_NOTICE_SUCCESS,
    category: 'article'
});

const exportNoticeError = () => ({
    type: EXPORT_NOTICE_ERROR,
    category: 'article'
});

const searchPending = (category) => ({
    type: SEARCH_PENDING,
    category
});

const searchError = (category, error) => ({
    type: SEARCH_ERROR,
    category,
    error
});

const searchCancel = (category) => ({
    type: SEARCH_CANCEL,
    category
});

const searchSuccess = (category, response, query) => ({
    type: SEARCH_SUCCESS,
    category,
    response,
    query
});

const retrievePending = (category, id) => ({
    type: RETRIEVE_PENDING,
    category,
    id
});

const retrieveCancel = (category, id) => ({
    type: RETRIEVE_CANCEL,
    category,
    id
});

const retrieveError = (category, id, error) => ({
    type: RETRIEVE_ERROR,
    category,
    id,
    error
});

const retrieveSuccess = (category, id, response) => ({
    type: RETRIEVE_SUCCESS,
    category,
    id,
    response
});

const retrieveLinkPending = () => ({
    type: RETRIEVE_LINK_PENDING
});

const retrieveLinkError = (category, id, error) => ({
    type: RETRIEVE_LINK_ERROR,
    category,
    id,
    error
});

const retrieveLinkSuccess = (category, id, response) => ({
    type: RETRIEVE_LINK_SUCCESS,
    category,
    id,
    response
});

const fetchPending = (request) => ({
    type: FETCH_PENDING,
    request
});

const fetchSuccess = (action, response) => ({
    type: FETCH_SUCCESS,
    action,
    response
});

const fetchError = (action, error) => ({
    type: FETCH_ERROR,
    action,
    error
});

const fetchCancel = (action) => ({
    type: FETCH_CANCEL,
    action
});

export default {
    initialize,
    setAllDomains,
    retrieve,
    batchRetrieve,
    batchRetrieveSuccess,
    batchRetrieveError,
    showNotice,
    retrieveLink,
    reset,
    setUrl,
    setDbUrl,
    setHistory,
    apiLogin,
    loginRenater,
    loginPending,
    loginSuccess,
    loginError,
    loginCancel,
    changeUsername,
    changePassword,
    changeAuthenticationMode,
    logout,
    showSidebar,
    showResult,
    showHistory,
    reloadHistory,
    restoreHistory,
    deleteHistory,
    clearError,
    navigate,
    setFullScreen,
    changeLanguage,
    showLogin,
    hideLogin,
    pauseAction,
    forbidAccess,
    selectRecord,
    selectPage,
    changeFacet,
    clearFacet,
    applyFacet,
    searchTerm,
    changeLetters,
    limitSearch,
    changeLimiter,
    loadPage,
    changeResultsPerPage,
    search,
    triggerSearch,
    changeDomain,
    changeSort,
    changeTerm,
    changeField,
    changeQuery,
    addQuery,
    removeQuery,
    linkedSearch,
    exportNotice,
    exportNoticePending,
    exportNoticeSuccess,
    exportNoticeError,
    searchPending,
    searchError,
    searchCancel,
    searchSuccess,
    retrieveError,
    retrieveSuccess,
    retrievePending,
    retrieveCancel,
    retrieveLinkError,
    retrieveLinkSuccess,
    retrieveLinkPending,
    fetchPending,
    fetchSuccess,
    fetchError,
    fetchCancel
};
