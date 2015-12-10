import actions, { SUBMIT_LOGIN, LOGIN_SUCCESS, LOGIN_PENDING, LOGIN_ERROR, LOGOUT } from '../actions';

export default store => next => action => loginToken(store, next, action);

export const loginToken = function loginToken(store, next, action) {
    next(action);

    switch (action.type) {
    case SUBMIT_LOGIN:
        const state = store.getState();
        store.dispatch(
            actions.login(state.url, action.data)
        );
        break;
    case LOGIN_SUCCESS:
        window.sessionStorage.setItem('token', action.response.token);
        break;
    case LOGIN_PENDING:
    case LOGIN_ERROR:
    case LOGOUT:
        window.sessionStorage.removeItem('token');
        break;
    }
};
