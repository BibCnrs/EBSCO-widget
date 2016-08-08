import {
    SEARCH,
    CHANGE_SORT,
    LINKED_SEARCH,
    DOMAIN_CHANGE,
    CLEAR_FACET,
    SEARCH_TERM,
    LIMIT_SEARCH,
    CHANGE_RESULTS_PER_PAGE,
    RELOAD_HISTORY,
    LOGOUT,
    RETRIEVE_SUCCESS,
    BATCH_RETRIEVE_SUCCESS,
    RETRIEVE_ERROR,
    RETRIEVE_CANCEL,
    SHOW_NOTICE
} from '../actions';

export const defaultState = {
    byId: {},
    noticeShown: []
};

const createNotice = (category) => (state = defaultState, action = {}) => {
    if(action.category !== category) {
        return state;
    }

    switch(action.type) {
    case RETRIEVE_SUCCESS: {
        return {
            ...state,
            byId: {
                ...state.byId,
                [action.id]: action.response
            }
        };
    }
    case BATCH_RETRIEVE_SUCCESS: {
        return {
            ...state,
            byId: {
                ...state.byId,
                ...action.response
            }
        };
    }
    case SHOW_NOTICE: {
        const index = state.noticeShown.indexOf(action.id);

        return index === -1 ? {
            ...state,
            noticeShown: [
                ...state.noticeShown,
                action.id
            ]
        } : {
            ...state,
            noticeShown: [
                ...state.noticeShown.slice(0, index),
                ...state.noticeShown.slice(index + 1)
            ]
        };
    }
    case RETRIEVE_CANCEL:
    case RETRIEVE_ERROR: {
        const index = state.noticeShown.indexOf(action.id);

        return index === -1 ? state : {
            ...state,
            noticeShown: [
                ...state.noticeShown.slice(0, index),
                ...state.noticeShown.slice(index + 1)
            ]
        };
    }
    case SEARCH:
    case CHANGE_SORT:
    case LINKED_SEARCH:
    case DOMAIN_CHANGE:
    case CLEAR_FACET:
    case SEARCH_TERM:
    case LIMIT_SEARCH:
    case CHANGE_RESULTS_PER_PAGE:
    case RELOAD_HISTORY:
    case LOGOUT:
        return defaultState;
    default:
        return state;
    }
};

export default createNotice;

export const isNoticeShown = (state, id) => {
    if(!state.noticeShown) {
        return false;
    }
    return state.noticeShown.indexOf(id) !== -1;
};

const getNoticeItems = (notice) => {
    const noticeItems = [].concat(notice.items)
    .slice(1);

    if (notice.dbId) {
        noticeItems.push({ label: notice.dbLabel || 'dbId', value: notice.dbId });
    }

    const { articleLinks } = notice;
    if (articleLinks) {
        const { fullTextLinks, pdfLinks } = articleLinks;
        if(fullTextLinks && fullTextLinks.length) {
            noticeItems.push({ label: 'fullTextLinks', value: fullTextLinks });
        }
        if(pdfLinks && pdfLinks.length) {
            noticeItems.push({ label: 'pdfLinks', value: pdfLinks });
        }
    }

    return noticeItems;
};

export const getNoticeById = (state, id) => {
    if (!state.byId || !state.byId[id]) {
        return undefined;
    }

    return getNoticeItems(state.byId[id])
    .reduce((result, datum) => ({ ...result, [datum.label]: datum.value }), {});
};
