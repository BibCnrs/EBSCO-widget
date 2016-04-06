import {
    LOGOUT,
    LOADING,
    LOADED,
    SHOW_SIDEBAR,
    ARTICLE,
    SHOW_HISTORY,
    RELOAD_HISTORY,
    RESTORE_HISTORY,
    SHOW_RESULT,
    CHANGE_LANGUAGE
} from '../../../lib/actions';
import userInterface, {defaultState} from '../../../lib/reducers/userInterface';

describe('reducers userInterface', function () {

    it('should default state to defaultState if none given', function () {
        assert.deepEqual(userInterface(undefined, { type: 'OTHER_ACTION_TYPE' }), defaultState);
    });

    it('should return defaultState if action is LOGOUT', function () {
        assert.deepEqual(userInterface({ other: 'data' }, { type: LOGOUT }), defaultState);
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

    it('should set limiterShown to action.visibility if action is SHOW_SIDEBAR', function () {
        assert.deepEqual(
            userInterface({ limiterShown: false, other: 'data' }, { type: SHOW_SIDEBAR, visibility: 'value' }),
            { limiterShown: 'value', other: 'data' }
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

    it('should set notice to action.index if action.visibility is true and aciton is ARTICLE_SHOW_NOTICE', function () {
        assert.deepEqual(
            userInterface({ notice: null, other: 'data' }, { type: ARTICLE.SHOW_NOTICE, visibility: true, index: 5 }),
            { notice: 5, other: 'data' }
        );
    });

    it('should set notice to null if action.visibility is false and action is ARTICLE_SHOW_NOTICE', function () {
        assert.deepEqual(
            userInterface({ notice: 5, other: 'data' }, { type: ARTICLE.SHOW_NOTICE, visibility: false, index: 5 }),
            { notice: null, other: 'data' }
        );
    });

    it('should set resultShown to false if action.visibility is false and action is SHOW_RESULT', function () {
        assert.deepEqual(
            userInterface({ other: 'data' }, { type: SHOW_RESULT, visibility: false }),
            { resultShown: false, other: 'data' }
        );
    });

    it('should set resultShown to true if action.visibility is true and action is SHOW_RESULT', function () {
        assert.deepEqual(
            userInterface({ other: 'data' }, { type: SHOW_RESULT, visibility: true }),
            { resultShown: true, other: 'data' }
        );
    });

    it('should set language to action.value if action is CHANGE_LANGUAGE', function () {
        assert.deepEqual(
            userInterface({ other: 'data' }, { type: CHANGE_LANGUAGE, value: 'en' }),
            { language: 'en', other: 'data' }
        );
    });

});
