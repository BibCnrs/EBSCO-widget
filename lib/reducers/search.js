'use strict';

import { Map } from 'immutable';
import { SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_ERROR } from '../actions';

export default function search(state = Map({ status: 'NONE' }), action) {
    switch (action.type) {
    case SEARCH_PENDING:
        return Map({ status: 'PENDING' });
    case SEARCH_SUCCESS:
        return Map({ status: 'SUCCESS' });
    case SEARCH_ERROR:
        return Map({
            status: 'ERROR',
            error: action.error.message
        });
    default:
        return state;
    }
}
