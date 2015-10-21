'use strict';

import { SHOW_ABSTRACT } from '../actions';

export default function result(state = {}, action) {
    switch (action.type) {
    case SHOW_ABSTRACT:
        return {
            ...state,
            abstractShown: action.visibility
        };
    default:
        return state;
    }
}
