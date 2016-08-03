import _ from 'lodash';

import {
    SELECT_RECORD,
    SELECT_PAGE,
    SEARCH,
    LIMIT_SEARCH,
    CHANGE_RESULTS_PER_PAGE,
    CHANGE_SORT,
    RELOAD_HISTORY,
    LINKED_SEARCH,
    LOGOUT
} from '../actions';

const createSelectedRecord = (category) => (state = [], action) => {
    if(action.category !== category) {
        return state;
    }

    switch(action.type) {
    case SELECT_PAGE: {
        if(isRecordSelected(state, action.ids)) {
            return _.difference(state, action.ids);
        }
        return _.union(state, action.ids);
    }
    case SELECT_RECORD: {
        const index = state.indexOf(action.id);
        return index === -1 ? [
            ...state,
            action.id
        ] : [
            ...state.slice(0, index),
            ...state.slice(index + 1)
        ];
    }
    case LOGOUT:
    case SEARCH:
    case LIMIT_SEARCH:
    case CHANGE_RESULTS_PER_PAGE:
    case CHANGE_SORT:
    case RELOAD_HISTORY:
    case LINKED_SEARCH:
        return [];
    default:
        return state;
    }
};

export default createSelectedRecord;

export const isRecordSelected = (state, ids) => {
    if(!Array.isArray(state)) {
        return false;
    }
    return _.every([].concat(ids), id => {
        return state.indexOf(id) !== -1;
    });
};

export const getSelectedRecordIds = (state) => {
    return state;
};
