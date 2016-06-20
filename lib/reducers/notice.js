import { combineReducers } from 'reduce';

import {
    RETRIEVE_SUCCESS,
    SHOW_NOTICE
} from '../actions';

export const defaultState = {
    byId: {},
    noticeShown: []
};

export const createNotice = (category) => (state = {}, action) => {
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
    default:
        return state;
    }
};

export default combineReducers({
    article: createNotice('article'),
    publication: createNotice('publication'),
    a2z: createNotice('a2z')
});
