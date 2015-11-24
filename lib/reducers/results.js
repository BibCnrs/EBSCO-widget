'use strict';

import { fromJS, List } from 'immutable';
import {
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    SEARCH_PENDING
} from '../actions';

import result from './result';

export default function results(state = List(), action) {
    state = fromJS(state);
    switch (action.type) {
    case SEARCH_SUCCESS:
        return fromJS(action.response)
        .map((item) => result(item, action));
    case SEARCH_PENDING:
    case SEARCH_ERROR:
        return List();
    default:
        const index = action.index;
        return state.set(index, result(state.get(index), action));
    }
}
