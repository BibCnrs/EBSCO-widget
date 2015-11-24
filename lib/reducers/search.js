'use strict';

import { Map, fromJS } from 'immutable';
import { SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_ERROR, TERM_CHANGE } from '../actions';

export default function search(state = Map({ term: '', status: 'NONE' }), action) {
    state = fromJS(state);
    switch (action.type) {
    case TERM_CHANGE:
        return state.set('term', action.term);
    case SEARCH_PENDING:
        return state.delete('error').set('status', 'PENDING');
    case SEARCH_SUCCESS:
        return state.delete('error').set('status', 'SUCCESS');
    case SEARCH_ERROR:
        return state.set('status', 'ERROR').set('error', action.error.message);
    default:
        return state;
    }
}
