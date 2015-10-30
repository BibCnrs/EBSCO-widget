'use strict';

import { LOGIN_SUCCESS } from '../actions';

export default store => next => action => loginToken(next, action);

export const loginToken = function loginToken(next, action) {
    if (action.type === LOGIN_SUCCESS) {
        window.localStorage.setItem('token', action.response.token);
    }

    next(action);
};
