import { Map, fromJS } from 'immutable';

import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../actions';

export default function login(state = Map({
    status: 'NONE',
    token: window.sessionStorage.getItem('token')
}), action) {
    switch (action.type) {
    case LOGIN_PENDING:
        return fromJS(state).delete('token').delete('error').set('status', 'PENDING');
    case LOGIN_SUCCESS:
        return fromJS(state).set('token', action.response.token).delete('error').set('status', 'SUCCESS');
    case LOGIN_ERROR:
        return fromJS(state).delete('token').set('status', 'ERROR').set('error', action.error.message);
    case LOGOUT:
        return fromJS(state).delete('token').set('status', 'NONE');
    default:
        return fromJS(state);
    }
}
