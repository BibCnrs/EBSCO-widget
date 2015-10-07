'use strict';

import { combineReducers } from 'redux';
import { SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_ERROR } from '../actions';

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

function results(state = [], action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        return action.response;
    case SEARCH_ERROR:
        return [];
    default:
        return state;
    }
}

export default combineReducers({
    search,
    results
});
