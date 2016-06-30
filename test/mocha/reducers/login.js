import {
    LOGIN_SUCCESS,
    API_LOGIN_SUCCESS,
    API_LOGIN_PENDING,
    API_LOGIN_ERROR,
    LOGOUT
} from '../../../lib/actions';

import login, * as fromLogin from '../../../lib/reducers/login';

describe('reducer login', function () {

    describe('actions', function () {

        describe('LOGIN_SUCCESS and API_LOGIN_SUCCESS', function () {

            const test = (type) => {
                const token = 'token';
                const nextState = login({
                    other: 'data',
                    status: 'NONE',
                    token: null
                }, {
                    type,
                    response: { token }
                });

                assert.deepEqual(nextState, {
                    other: 'data',
                    status: 'SUCCESS',
                    token
                });
            };

            it('LOGIN_SUCCESS should set status to SUCCESS and token to action.response.token', function () {
                test(LOGIN_SUCCESS);
            });

            it('API_LOGIN_SUCCESS should set status to SUCCESS and token to action.response.token', function () {
                test(API_LOGIN_SUCCESS);
            });
        });

        describe('API_LOGIN_PENDING', function () {
            it('should set status to PENDING', function () {
                const nextState = login({
                    other: 'data',
                    status: 'NONE'
                }, {
                    type: API_LOGIN_PENDING
                });

                assert.deepEqual(nextState, {
                    other: 'data',
                    status: 'PENDING'
                });
            });
        });

        describe('API_LOGIN_ERROR', function () {
            it('should set status to ERROR', function () {
                const nextState = login({
                    other: 'data',
                    status: 'NONE'
                }, {
                    type: API_LOGIN_ERROR
                });

                assert.deepEqual(nextState, {
                    other: 'data',
                    status: 'ERROR'
                });
            });
        });

        describe('LOGOUT', function () {
            it('should return defaultState', function () {
                const nextState = login({
                    other: 'data',
                    status: 'SUCCESS',
                    toke: 'token'
                }, {
                    type: LOGOUT
                });

                assert.deepEqual(nextState, fromLogin.defaultState);
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
