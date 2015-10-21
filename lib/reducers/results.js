'use strict';

import immutable, { List } from 'immutable';
import { SEARCH_SUCCESS, SEARCH_ERROR, SHOW_ABSTRACT } from '../actions';
import result from './result';

export default function results(state = List(), action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        return immutable.fromJS(action.response);
    case SEARCH_ERROR:
        return List();
    case SHOW_ABSTRACT:
        const index = action.index;
        return state.set(index, result(state.get(index), action));
    default:
        return state;
    }
}
