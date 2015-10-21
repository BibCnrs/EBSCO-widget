'use strict';

import { Map } from 'immutable';
import { SHOW_ABSTRACT } from '../actions';

export default function result(state = Map(), action) {
    switch (action.type) {
    case SHOW_ABSTRACT:
        return state.set('abstractShown', action.visibility);
    default:
        return state;
    }
}
