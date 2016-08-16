import {
    CHANGE_AUTHENTICATION_MODE,
    CHANGE_USERNAME,
    CHANGE_PASSWORD,
    LOGIN_SUCCESS,
    LOGIN_PENDING,
    LOGIN_ERROR,
    LOGIN_CANCEL,
    LOGOUT
} from '../../../lib/actions';

import login, * as fromLogin from '../../../lib/reducers/login';

describe('reducer login', function () {

    describe('actions', function () {

        describe('CHANGE_AUTHENTICATION_MODE', function () {
            it('should set mode to action.value', function () {
                const nextState = login({
                    other: 'data'
                }, {
                    type: CHANGE_AUTHENTICATION_MODE,
                    value: 'mode'
                });

                assert.deepEqual(nextState, {
                    other: 'data',
                    mode: 'mode'
                });

            });
        });

        describe('CHANGE_USERNAME', function () {
            it('should set username to action.value', function () {
                const nextState = login({
                    other: 'data'
                }, {
                    type: CHANGE_USERNAME,
                    value: 'username'
                });

                assert.deepEqual(nextState, {
                    other: 'data',
                    username: 'username'
                });

            });
        });

        describe('CHANGE_PASSWORD', function () {
            it('should set username to action.value', function () {
                const nextState = login({
                    other: 'data'
                }, {
                    type: CHANGE_PASSWORD,
                    value: 'password'
                });

                assert.deepEqual(nextState, {
                    other: 'data',
                    password: 'password'
                });

            });
        });

        it('LOGIN_SUCCESS should set status to SUCCESS and token to action.response.token', function () {
            const token = 'token';
            const nextState = login({
                other: 'data',
                status: 'NONE',
                token: null
            }, {
                type: LOGIN_SUCCESS,
                response: { token }
            });

            assert.deepEqual(nextState, {
                isLoggingWithRenater: false,
                other: 'data',
                username: '',
                password: '',
                status: 'SUCCESS',
                token
            });
        });

        describe('LOGIN_PENDING', function () {
            it('should set status to PENDING and isLoggingWithRenater to ation.renater', function () {
                const nextState = login({
                    other: 'data',
                    status: 'NONE'
                }, {
                    type: LOGIN_PENDING,
                    renater: 'depends'
                });

                assert.deepEqual(nextState, {
                    other: 'data',
                    status: 'PENDING',
                    isLoggingWithRenater: 'depends'
                });
            });
        });

        describe('LOGIN_ERROR', function () {
            it('should set status to ERROR and isLoggingWithRenater to false', function () {
                const nextState = login({
                    other: 'data',
                    status: 'NONE'
                }, {
                    type: LOGIN_ERROR
                });

                assert.deepEqual(nextState, {
                    other: 'data',
                    status: 'ERROR',
                    isLoggingWithRenater: false
                });
            });
        });

        describe('LOGIN_CANCEL', function () {
            it('should set status to NONE and isLoggingWithRenater to false', function () {
                const nextState = login({
                    other: 'data',
                    status: 'PENDING'
                }, {
                    type: LOGIN_CANCEL
                });

                assert.deepEqual(nextState, {
                    other: 'data',
                    status: 'NONE',
                    isLoggingWithRenater: false
                });
            });
        });

        describe('LOGOUT', function () {
            it('should return defaultState except for the mod', function () {
                const nextState = login({
                    other: 'data',
                    status: 'SUCCESS',
                    token: 'token',
                    mode: 'i will stay'
                }, {
                    type: LOGOUT
                });

                assert.deepEqual(nextState, {
                    ...fromLogin.defaultState,
                    mode: 'i will stay'
                });
            });
        });
    });

    describe('selector', function () {
        describe('isUserLogged', function () {
            it('should return true if token is set', function () {
                const state = {
                    token: 'token'
                };
                assert.isTrue(fromLogin.isUserLogged(state));
            });

            it('should return false if token is not set', function () {
                const state = {
                    token: null
                };
                assert.isFalse(fromLogin.isUserLogged(state));
            });
        });
    });

});
