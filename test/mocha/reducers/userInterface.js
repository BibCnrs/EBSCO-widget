import {
    LOGOUT,
    SEARCH_PENDING,
    LOGIN_PENDING,
    OPEN_SEARCH,
    LOADING,
    LOADED,
    SHOW_LIMITER,
    SHOW_MORE_LIMITER,
    CHANGE_LIMITER,
    LIMIT_SEARCH,
    SHOW_HISTORY,
    RELOAD_HISTORY,
    RESTORE_HISTORY,
    SHOW_NOTICE,
    RESET
} from '../../../lib/actions';
import userInterface, {defaultState} from '../../../lib/reducers/userInterface';

describe('reducers userInterface', function () {

    it('should default state to defaultState if none given', function () {
        assert.deepEqual(userInterface(undefined, { type: 'OTHER_ACTION_TYPE' }), defaultState);
    });

    it('should return defaultState if action is LOGOUT', function () {
        assert.deepEqual(userInterface({ other: 'data' }, { type: LOGOUT }), defaultState);
    });

    it('should set open to true if action is SEARCH_PENDING or LOGIN_PENDING', function () {
        assert.deepEqual(
            userInterface({ open: false, other: 'data' }, { type: SEARCH_PENDING }),
            { open: true, other: 'data' }
        );
        assert.deepEqual(
            userInterface({ open: false, other: 'data' }, { type: LOGIN_PENDING }),
            { open: true, other: 'data' }
        );
    });

    it('should set open to action.value if action is OPEN_SEARCH', function () {
        assert.deepEqual(
            userInterface({ open: false, other: 'data' }, { type: OPEN_SEARCH, value: 'value' }),
            { open: 'value', other: 'data' }
        );
    });

    it('should set loading to true if action is LOADING', function () {
        assert.deepEqual(
            userInterface({ loading: false, other: 'data' }, { type: LOADING }),
            { loading: true, other: 'data' }
        );
    });

    it('should set loading to false if action is LOADED', function () {
        assert.deepEqual(
            userInterface({ loading: true, other: 'data' }, { type: LOADED }),
            { loading: false, other: 'data' }
        );
    });

    it('should set limiterShown to action.visibility if action is SHOW_LIMITER', function () {
        assert.deepEqual(
            userInterface({ limiterShown: false, other: 'data' }, { type: SHOW_LIMITER, visibility: 'value' }),
            { limiterShown: 'value', other: 'data' }
        );
    });

    it('should set limiterMoreShown to action.visibility if action is SHOW_MORE_LIMITER', function () {
        assert.deepEqual(
            userInterface({ limiterMoreShown: false, other: 'data' }, { type: SHOW_MORE_LIMITER, visibility: 'value' }),
            { limiterMoreShown: 'value', other: 'data' }
        );
    });

    it('should set limiterHasChanged to true if action is CHANGE_LIMITER or RESET', function () {
        assert.deepEqual(
            userInterface({ limiterHasChanged: false, other: 'data' }, { type: CHANGE_LIMITER }),
            { limiterHasChanged: true, other: 'data' }
        );
        assert.deepEqual(
            userInterface({ limiterHasChanged: false, other: 'data' }, { type: RESET }),
            { limiterHasChanged: true, other: 'data' }
        );
    });

    it('should set limiterHasChanged to false if action is LIMIT_SEARCH', function () {
        assert.deepEqual(
            userInterface({ limiterHasChanged: true, other: 'data' }, { type: LIMIT_SEARCH }),
            { limiterHasChanged: false, other: 'data' }
        );
    });

    it('should set historyShown to action.visibility if action is SHOW_HISTORY', function () {
        assert.deepEqual(
            userInterface({ historyShown: false, other: 'data' }, { type: SHOW_HISTORY, visibility: 'value' }),
            { historyShown: 'value', other: 'data' }
        );
    });

    it('should set historyShown to false and limiterShown to true if action is RELOAD_HISTORY or RESTORE_HISTORY', function () {
        assert.deepEqual(
            userInterface({ other: 'data' }, { type: RELOAD_HISTORY }),
            { historyShown: false, limiterShown: true, other: 'data' }
        );
        assert.deepEqual(
            userInterface({ other: 'data' }, { type: RESTORE_HISTORY }),
            { historyShown: false, limiterShown: true, other: 'data' }
        );
    });

    it('should set notice to action.index if action.visibility is true and aciton is SHOW_NOTICE', function () {
        assert.deepEqual(
            userInterface({ notice: null, other: 'data' }, { type: SHOW_NOTICE, visibility: true, index: 5 }),
            { notice: 5, other: 'data' }
        );
    });

    it('should set notice to null if action.visibility is false and action is SHOW_NOTICE', function () {
        assert.deepEqual(
            userInterface({ notice: 5, other: 'data' }, { type: SHOW_NOTICE, visibility: false, index: 5 }),
            { notice: null, other: 'data' }
        );
    });

});
