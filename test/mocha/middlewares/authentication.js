import { authentication } from '../../../lib/middlewares/authentication';
import actions, {
    NAVIGATE,
    LOGIN,
    API_LOGIN_SUCCESS,
    A2Z,
    PUBLICATION
} from '../../../lib/actions';

describe('authentication middleware', function () {
    let store, state, next, nextAction;

    beforeEach(function () {
        store = {
            getState: function () {
                return state;
            }
        };
        nextAction = [];
        next = function (action) {
            nextAction.push(action);
        };
    });

    it('should trigger all received action if login.token is set', function () {
        state = {
            login: {
                token: 'token'
            },
            pausedAction: {}
        };
        const actions = [ NAVIGATE, PUBLICATION.SHOW_NOTICE, A2Z.SHOW_NOTICE ]
        .map(type => ({ type }));

        actions.forEach(action => {
            authentication(store, next, action);
        });
        assert.deepEqual(nextAction, actions);
    });

    describe('not logged', function () {

        beforeEach(function () {
            state = {
                login: {
                    token: undefined
                },
                pausedAction: {
                    type: 'I_WILL_BE_BACK'
                }
            };
        });

        it('should not trigger SHOW_LOGIN and pause action if it is NAVIGATE but not location: article', function () {
            const action = {
                type: NAVIGATE,
                location: 'somewhere'
            };
            authentication(store, next, action);
            assert.deepEqual(nextAction, [
                action
            ]);
        });

        it('should trigger SHOW_LOGIN and pause action if it is NAVIGATE with location: article', function () {
            const action = {
                type: NAVIGATE,
                location: 'article'
            };
            authentication(store, next, action);
            assert.deepEqual(nextAction, [
                actions.pauseAction(action),
                actions.showLogin()
            ]);
        });

        it('should trigger SHOW_LOGIN and pause action if it is PUBLICATION.SHOW_NOTICE', function () {
            const action = {
                type: PUBLICATION.SHOW_NOTICE
            };
            authentication(store, next, action);
            assert.deepEqual(nextAction, [
                actions.pauseAction(action),
                actions.showLogin()
            ]);
        });

        it('should trigger SHOW_LOGIN and pause action if it is A2Z.SHOW_NOTICE', function () {
            const action = {
                type: A2Z.SHOW_NOTICE
            };
            authentication(store, next, action);
            assert.deepEqual(nextAction, [
                actions.pauseAction(action),
                actions.showLogin()
            ]);
        });

        it('should trigger itself and the paused action action is LOGIN', function () {
            const action = {
                type: LOGIN
            };
            authentication(store, next, action);
            assert.deepEqual(nextAction, [
                action,
                state.pausedAction
            ]);
        });

        it('should trigger itself and the paused action action is API_LOGIN_SUCCESS', function () {
            const action = {
                type: API_LOGIN_SUCCESS
            };
            authentication(store, next, action);
            assert.deepEqual(nextAction, [
                action,
                state.pausedAction
            ]);
        });
    });

});
