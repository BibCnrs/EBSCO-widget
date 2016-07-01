import {
    SEARCH_SUCCESS,
    SEARCH_TERM,
    LIMIT_SEARCH,
    PAGE_LOAD,
    CHANGE_RESULTS_PER_PAGE,
    RELOAD_HISTORY,
    LOGOUT
} from '../actions';


export const defaultState = {
    maxPage: 0,
    byId: {}
};

const createSearchResult = (category) => (state = defaultState, action) => {
    if(action.category !== category) {
        return state;
    }

    switch (action.type) {
    case SEARCH_SUCCESS: {
        const { currentPage, results } = action.response;

        return {
            ...state,
            currentPage,
            [currentPage]: results
            .map(record => record.id),
            byId: results.reduce((recordList, record) => ({
                ...recordList,
                [record.id]: record
            }), state.byId),
            maxPage: action.response.maxPage,
            totalHits: action.response.totalHits
        };
    }
    case SEARCH_TERM:
    case LIMIT_SEARCH:
    case CHANGE_RESULTS_PER_PAGE:
    case RELOAD_HISTORY:
    case LOGOUT:
        return defaultState;
    case PAGE_LOAD:
        return {
            ...state,
            currentPage: action.page
        };
    default:
        return state;
    }
};

export default createSearchResult;

export const getCurrentPage = (state) => {
    return state[state.currentPage];
};

export const getCurrentPageRecords = (state) => {
    const page = getCurrentPage(state);
    if(!page) {
        return [];
    }

    return page
    .map(id => state.byId[id]);
};

export const getPaginationData = (state) => {
    const page = getCurrentPage(state);
    const { totalHits, currentPage, maxPage } = state;
    const first = page && page[0];
    const last = Array.isArray(page) && page.slice(-1)[0];

    return {
        first,
        last,
        totalHits,
        maxPage,
        currentPage
    };
};

export const getRecordById = (state, id) => {
    return state.byId && state.byId[id] || undefined;
};

export const getRecordPublicationIdByIds = (state, ids) => {
    return ids
    .map(id => getRecordById(state, id))
    .filter(record => !!record)
    .map(record => record.publicationId);
};

const convertTypeToTY = (type) => {
    switch (type) {
    case 'Periodical':
    case 'Academic Journal':
        return 'JOUR';
    case 'Conference':
        return 'CPAPER';
    case 'Report':
        return 'RPRT';
    case 'News':
        return 'NEWS';
    case 'Book':
        return 'BOOK';
    case 'Dissertation/ Thesis':
        return 'THES';
    case 'Primary Source':
    case 'Biography':
    default:
        return 'GEN';
    }
};

export const getTY = (state, id) => {
    const record = getRecordById(state, id);
    if(!record) {
        throw new Error(`Missing record for id: ${id}`);
    }
    const TY = convertTypeToTY(state.byId[id].publicationType);

    return `TY  - ${TY}`;
};
