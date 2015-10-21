'use strict';

import { SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_ERROR } from '../actions';

export default function search(state = 'NONE', action) {
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
