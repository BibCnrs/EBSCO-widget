'use strict';

import { combineReducers } from 'redux';
import { SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_ERROR, SHOW_ABSTRACT } from '../actions';

function search(state = 'NONE', action) {
    switch (action.type) {
    case SEARCH_PENDING:
        return 'PENDING';
    case SEARCH_SUCCESS:
        return 'SUCCESS';
    case SEARCH_ERROR:
        return 'ERROR';
    default:
        return state;
    }
}

function result(state = {}, action) {
    switch (action.type) {
    case SHOW_ABSTRACT:
        return {
            ...state,
            abstractShown: action.visibility
        };
    default:
        return state;
    }
}

function arrayReplace(array, index, newItem) {
    if (index === 0) {
        return [newItem, ...array.slice(1, array.length)];
    }
    return [...array.slice(0, index), newItem, ...array.slice(index + 1)];
}

function results(state = [], action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        return action.response;
    case SEARCH_ERROR:
        return [];
    case SHOW_ABSTRACT:
        const index = action.index;

        return arrayReplace(state, index, result(state[index], action));
    default:
        return state;
    }
}

export default combineReducers({
    search,
    results
});
