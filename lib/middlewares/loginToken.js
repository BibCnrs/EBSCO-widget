'use strict';

import { LOGIN_SUCCESS, LOGIN_PENDING, LOGIN_ERROR } from '../actions';

export default store => next => action => loginToken(next, action);

export const loginToken = function loginToken(next, action) {
    if (action.type === LOGIN_SUCCESS) {
        window.localStorage.setItem('token', action.response.token);
    }
    if (action.type === LOGIN_PENDING || action.type === LOGIN_ERROR) {
        window.localStorage.removeItem('token');
    }

    next(action);
};
