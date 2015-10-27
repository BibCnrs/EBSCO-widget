'use strict';

import { fromJS, Map } from 'immutable';
import { SHOW_ABSTRACT } from '../actions';

export default function result(state = Map(), action) {
    switch (action.type) {
    case SHOW_ABSTRACT:
        return fromJS(state).set('abstractShown', action.visibility);
    default:
        return fromJS(state);
    }
}
