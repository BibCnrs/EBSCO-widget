'use strict';

import { fromJS, Map, List } from 'immutable';
import {
    SHOW_NOTICE,
    RETRIEVE_PENDING,
    RETRIEVE_SUCCESS,
    RETRIEVE_ERROR
} from '../actions';

export default function result(state = Map({ status: 'NONE', data: List() }), action) {
    state = fromJS(state);
    switch (action.type) {
    case SHOW_NOTICE:
        return state
        .set('shown', action.visibility);
    case RETRIEVE_PENDING:
        return state
        .delete('error')
        .set('shown', false)
        .set('status', 'PENDING');
    case RETRIEVE_SUCCESS:
        return state
        .set('data', List(action.response))
        .set('status', 'SUCCESS')
        .set('shown', true);
    case RETRIEVE_ERROR:
        return state
        .set('data', List())
        .set('status', 'ERROR')
        .set('shown', false)
        .set('error', action.error.message);
    default:
        return state;
    }
}
