import {
    RETRIEVE_SUCCESS,
    BATCH_RETRIEVE_SUCCESS,
    RETRIEVE_ERROR,
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

export const getNoticeById = (state, id) => {
    if (!state.byId) {
        return undefined;
    }

    return state.byId[id];
};

export const getNoticesByIds = (state, ids) => {
    return ids.map(id => getNoticeById(state, id));
};

export const getMissingNoticeIds = (state, ids) => {
    const noticeIds = Object.keys(state.byId);

    return ids
    .map(id => id.toString()) // literal key are always string
    .filter(id => {
        return noticeIds.indexOf(id) === -1;
    });
};

export const getNoticeLiteralById = (state, id) => {
    return state.byId[id]
    .reduce((literal, item) => ({
        ...literal,
        [item.name]: item.value
    }), {});
};
