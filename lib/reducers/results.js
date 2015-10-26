'use strict';

import { fromJS, List } from 'immutable';
import { SEARCH_SUCCESS, SEARCH_ERROR, SEARCH_PENDING, SHOW_ABSTRACT } from '../actions';
import result from './result';

export default function results(state = List(), action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        return fromJS(action.response);
    case SEARCH_PENDING:
    case SEARCH_ERROR:
        return List();
    case SHOW_ABSTRACT:
        const index = action.index;
        return fromJS(state).set(index, result(state.get(index), action));
    default:
        return fromJS(state);
    }
}
