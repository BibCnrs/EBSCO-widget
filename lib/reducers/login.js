import { Map, fromJS } from 'immutable';

import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions';

export default function (token) {
    return function login(state = Map({ status: 'NONE', token: token || window.sessionStorage.getItem('token') }), action) {
        switch (action.type) {
        case LOGIN_PENDING:
            return fromJS(state).delete('token').delete('error').set('status', 'PENDING');
        case LOGIN_SUCCESS:
            return fromJS(state).set('token', action.response.token).delete('error').set('status', 'SUCCESS');
        case LOGIN_ERROR:
            return fromJS(state).delete('token').set('status', 'ERROR').set('error', action.error.message);
        default:
            return fromJS(state);
        }
    };
}
