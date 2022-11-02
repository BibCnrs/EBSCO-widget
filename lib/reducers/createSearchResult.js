import {
    SEARCH,
    CHANGE_SORT,
    LINKED_SEARCH,
    CLEAR_FACET,
    SEARCH_SUCCESS,
    SEARCH_TERM,
    LIMIT_SEARCH,
    PAGE_LOAD,
    CHANGE_RESULTS_PER_PAGE,
    RELOAD_HISTORY,
    LOGOUT,
    RETRIEVE_SUCCESS,
} from '../actions';

export const defaultState = {
    maxPage: 0,
    byId: {},
};

const getArticleLinks = action => {
    const { articleLinks } = action.response;

    if (
        !articleLinks ||
        ((!articleLinks.fullTextLinks || !articleLinks.fullTextLinks.length) &&
            (!articleLinks.pdfLinks || !articleLinks.pdfLinks.length) &&
            (!articleLinks.urls || !articleLinks.urls.length) &&
            !articleLinks.html)
    ) {
        return null;
    }

    return articleLinks;
};

const createSearchResult = category => (state = defaultState, action) => {
    if (action.category !== category && action.type !== LOGOUT) {
        return state;
    }

    switch (action.type) {
        case SEARCH_SUCCESS: {
            const { currentPage, results } = action.response;
            return {
                ...state,
                currentPage,
                [currentPage]: results.map(record => record.id),
                byId: results.reduce(
                    (recordList, record) => ({
                        ...recordList,
                        [record.id]: record,
                    }),
                    state.byId,
                ),
                maxPage: action.response.maxPage,
                totalHits: action.response.totalHits,
                noFullText: action.response.noFullText,
            };
        }
        case SEARCH:
        case CHANGE_SORT:
        case LINKED_SEARCH:
        case CLEAR_FACET:
        case SEARCH_TERM:
        case LIMIT_SEARCH:
        case CHANGE_RESULTS_PER_PAGE:
        case RELOAD_HISTORY:
        case LOGOUT:
            return defaultState;
        case PAGE_LOAD:
            return {
                ...state,
                currentPage: action.page,
            };
        case RETRIEVE_SUCCESS: {
            if (action.category !== 'article') {
                return state;
            }
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        articleLinks: getArticleLinks(action),
                    },
                },
            };
        }
        default:
            return state;
    }
};

export default createSearchResult;

export const getCurrentPage = state => {
    return state.currentPage;
};

export const getCurrentPageData = state => {
    if (!state || !state[state.currentPage]) {
        return undefined;
    }
    return state[state.currentPage];
};

export const getCurrentPageRecords = state => {
    const page = getCurrentPageData(state);
    if (!page) {
        return [];
    }

    return page.map(id => state.byId[id]);
};

export const getPaginationData = state => {
    if (!state) {
        return {};
    }
    const page = getCurrentPageData(state);
    const { totalHits, currentPage, maxPage } = state;
    const first = (page && page[0]) || 0;
    const last = (Array.isArray(page) && page.slice(-1)[0]) || 0;

    return {
        first,
        last,
        totalHits,
        maxPage,
        currentPage,
    };
};

export const getRecordById = (state, id) => {
    return (state.byId && state.byId[id]) || undefined;
};

export const getRecordsByIds = (state, ids) => {
    return ids.map(id => getRecordById(state, id));
};

export const getExportLinkByIds = (state, { ids, format }) => {
    return getRecordsByIds(state, ids)
        .map(record => record.exportLinks[format])
        .filter(exportLinks => !!exportLinks);
};

export const getRecordPublicationIdById = (state, id) => {
    const record = getRecordById(state, id);

    return record.publicationId;
};

export const getRecordDbIdById = (state, id) => {
    const record = getRecordById(state, id);

    return record.dbId;
};

export const getRecordAnById = (state, id) => {
    const record = getRecordById(state, id);

    return record.an;
};

export const getRecordNoticeIdentifierById = (state, location, id) => {
    if (location === 'article') {
        return {
            dbId: getRecordDbIdById(state, id),
            an: getRecordAnById(state, id),
        };
    }

    return getRecordPublicationIdById(state, id);
};

export const getRecordIdsWithMissingLink = state => {
    if (!state || !state[state.currentPage]) {
        return [];
    }
    return state[state.currentPage].filter(id => {
        const { articleLinks } = state.byId[id];
        if (!articleLinks) {
            return true;
        }
        const nbFullTextLinks = articleLinks.fullTextLinks
            ? articleLinks.fullTextLinks.length
            : 0;
        const nbPdfLinks = articleLinks.pdfLinks
            ? articleLinks.pdfLinks.length
            : 0;

        return nbFullTextLinks === 0 && nbPdfLinks === 0;
    });
};

export const hasResult = state => Object.keys(state.byId).length > 0;

export const hasNoFullTextResult = state =>
    state && state.totalHits > 0 && state.noFullText;
