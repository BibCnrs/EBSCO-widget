import { loginToken } from '../../../lib/middlewares/loginToken';
import actions, { SUBMIT_LOGIN, LOGIN_SUCCESS, LOGIN_PENDING, LOGIN_ERROR, LOGOUT } from '../../../lib/actions';

describe('loginToken middleware', function () {
    let store, dispatchedAction, next, nextAction;
    const state = {
        url: 'http://apiroute'
    };

    beforeEach(function () {
        dispatchedAction = [];
        store = {
            getState: function () {
                return state;
            },
            dispatch: function (action) {
                dispatchedAction.push(action);
            }
        };
        nextAction = [];
        next = function (action) {
            nextAction.push(action);
        };
    });

    it('should dispatch login action if SUBMIT_LOGIN is received', function () {
        const action = {
            type: SUBMIT_LOGIN,
            data: 'data'
        };

        loginToken(store, next, action);
        assert.deepEqual(nextAction, [action]);
        assert.deepEqual(dispatchedAction, [actions.login(state.url, 'data')]);
    });

    it('should save action.token in sessionStorage if action type is LOGIN_SUCCESS', function () {
        const action = {
            type: LOGIN_SUCCESS,
            response: {
                token: 'tokenValue',
                domains: ['vie', 'shs']
            }
        };

        let storedItem;
        window.sessionStorage = {
            setItem: (name, value) => {storedItem = {...storedItem, [name]: value};}
        };

        loginToken(store, next, action);
        assert.deepEqual(nextAction, [action]);
        assert.deepEqual(dispatchedAction, []);
        assert.deepEqual(storedItem, {
            domains: '["vie","shs"]',
            token: 'tokenValue'
        });

        delete window.sessionStorage;
    });

    it('should remove token from sessionStorage if action type is LOGOUT, LOGIN_ERROR or LOGIN_PENDING', function () {
        const actions = [
            { type: LOGIN_PENDING },
            { type: LOGIN_ERROR },
            { type: LOGOUT }
        ];

        actions.forEach((action) => {
            let removedItems = [];
            window.sessionStorage = {
                removeItem: (item) => {removedItems.push(item);}
            };

            loginToken(store, next, action);
            assert.deepEqual(removedItems, ['token', 'domains']);
            assert.deepEqual(dispatchedAction, []);

            delete window.sessionStorage;
        });
    });

    it ('should do nothing on other action type', function () {
        const action = {
            type: 'DONT_CARE'
        };

        loginToken(store, next, action);
        assert.deepEqual(nextAction, [action]);
        assert.deepEqual(dispatchedAction, []);
    });
});
