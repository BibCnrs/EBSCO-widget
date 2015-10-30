'use strict';

import { Map, fromJS } from 'immutable';

import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions';

export default function login(state = Map({ status: 'NONE' }), action) {
    switch (action.type) {
    case LOGIN_PENDING:
        return fromJS(state).delete('error').set('status', 'PENDING');
    case LOGIN_SUCCESS:
        return fromJS(state).delete('error').set('status', 'SUCCESS');
    case LOGIN_ERROR:
        return fromJS(state).set('status', 'ERROR').set('error', action.error.message);
    default:
        return fromJS(state);
    }
}
