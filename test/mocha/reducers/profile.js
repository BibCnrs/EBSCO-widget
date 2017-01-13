import {
    CHANGE_FAVORITE_DOMAIN,
    HIDE_PROFILE,
    LOGIN_SUCCESS,
    UPDATE_PROFILE_CANCEL,
    UPDATE_PROFILE_ERROR,
    UPDATE_PROFILE_PENDING,
    UPDATE_PROFILE_SUCCESS,
} from '../../../lib/actions';

import profile from '../../../lib/reducers/profile';

describe('reducer profile', function () {

    describe('actions', function () {

        describe('CHANGE_FAVORITE_DOMAIN', function () {
            it('should set favorite_domain to action.value', function () {
                const nextState = profile({
                    other: 'data'
                }, {
                    type: CHANGE_FAVORITE_DOMAIN,
                    value: 'favorite_domain'
                });

                assert.deepEqual(nextState, {
                    other: 'data',
                    favorite_domain: 'favorite_domain'
                });

            });
        });

        it('LOGIN_SUCCESS should set username, origin and favorite_domain from response data', function () {
            const nextState = profile({
                other: 'data',
                status: 'NONE',
            }, {
                type: LOGIN_SUCCESS,
                response: { username: 'username', domains: 'domains', favorite_domain: 'favorite_domain', origin: 'janus' }
            });

            assert.deepEqual(nextState, {
                favorite_domain: 'favorite_domain',
                origin: 'janus',
                other: 'data',
                status: 'NONE',
                username: 'username',
            });
        });

        describe('UPDATE_PROFILE_PENDING', function () {
            it('should set status to PENDING', function () {
                const nextState = profile({
                    other: 'data',
                    status: 'NONE'
                }, {
                    type: UPDATE_PROFILE_PENDING
                });

                assert.deepEqual(nextState, {
                    other: 'data',
                    status: 'PENDING'
                });
            });
        });

        describe('UPDATE_PROFILE_SUCCESS', function () {
            it('should set status to SUCCESS', function () {
                const nextState = profile({
                    other: 'data',
                    status: 'NONE'
                }, {
                    type: UPDATE_PROFILE_SUCCESS
                });

                assert.deepEqual(nextState, {
                    other: 'data',
                    status: 'SUCCESS'
                });
            });
        });

        describe('UPDATE_PROFILE_ERROR', function () {
            it('should set status to ERROR', function () {
                const nextState = profile({
                    other: 'data',
                    status: 'NONE'
                }, {
                    type: UPDATE_PROFILE_ERROR
                });

                assert.deepEqual(nextState, {
                    other: 'data',
                    status: 'ERROR',
                });
            });
        });

        describe('UPDATE_PROFILE_CANCEL', function () {
            it('should set status to NONE', function () {
                const nextState = profile({
                    other: 'data',
                    status: 'PENDING'
                }, {
                    type: UPDATE_PROFILE_CANCEL
                });

                assert.deepEqual(nextState, {
                    other: 'data',
                    status: 'NONE',
                });
            });
        });

        describe('HIDE_PROFILE', function () {
            it('should set status to NONE', function () {
                const nextState = profile({
                    other: 'data',
                    status: 'PENDING'
                }, {
                    type: HIDE_PROFILE
                });

                assert.deepEqual(nextState, {
                    other: 'data',
                    status: 'NONE',
                });
            });
        });
    });
});
