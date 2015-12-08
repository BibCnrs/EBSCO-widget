import { LOGIN_SUCCESS, LOGIN_PENDING, LOGIN_ERROR } from '../actions';

export default store => next => action => loginToken(next, action);

export const loginToken = function loginToken(next, action) {
    if (action.type === LOGIN_SUCCESS) {
        window.sessionStorage.setItem('token', action.response.token);
    }
    if (action.type === LOGIN_PENDING || action.type === LOGIN_ERROR) {
        window.sessionStorage.removeItem('token');
    }

    next(action);
};
