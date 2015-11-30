'use strict';

import { LOADING, LOADED } from '../actions';

export default function open(state = false, action) {
    switch (action.type) {
    case LOADING:
        return true;
    case LOADED:
        return false;
    default:
        return state;
    }
}
