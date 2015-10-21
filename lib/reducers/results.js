'use strict';

import { SEARCH_SUCCESS, SEARCH_ERROR, SHOW_ABSTRACT } from '../actions';
import result from './result';

function arrayReplace(array, index, newItem) {
    if (index === 0) {
        return [newItem, ...array.slice(1, array.length)];
    }
    return [...array.slice(0, index), newItem, ...array.slice(index + 1)];
}

export default function results(state = [], action) {
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
