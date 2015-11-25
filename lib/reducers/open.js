'use strict';

import { OPEN_SEARCH } from '../actions';

export default function open(state = false, action) {
    switch (action.type) {
    case OPEN_SEARCH:
        return action.value;
    default:
        return state;
    }
}
