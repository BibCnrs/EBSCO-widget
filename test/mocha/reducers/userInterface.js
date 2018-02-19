import {
    LOGIN_SUCCESS,
    LOGOUT,
    SEARCH_SUCCESS,
    SHOW_SIDEBAR,
    SHOW_HISTORY,
    RELOAD_HISTORY,
    RESTORE_HISTORY,
    SHOW_RESULT,
    NAVIGATE,
    FULLSCREEN,
    CHANGE_LANGUAGE,
    SHOW_LOGIN,
    HIDE_LOGIN,
    INITIALIZE,
} from '../../../lib/actions';

import userInterface, {
    defaultState,
} from '../../../lib/reducers/userInterface';

describe('reducers userInterface', function() {
    it('should default state to defaultState if none given', function() {
        assert.deepEqual(
            userInterface(undefined, { type: 'OTHER_ACTION_TYPE' }),
            defaultState,
        );
    });

    it('should return defaultState except for readOnlyLanguage if action is LOGOUT', function() {
        assert.deepEqual(
            userInterface(
                { other: 'data', readOnlyLanguage: true },
                { type: LOGOUT },
            ),
            {
                ...defaultState,
                readOnlyLanguage: true,
            },
        );
    });

    it('should return set loginShown and profileShown to false if action is LOGIN_SUCCESS and favorite_domain is included in domains', function() {
        assert.deepEqual(
            userInterface(
                { other: 'data' },
                {
                    type: LOGIN_SUCCESS,
                    response: { domains: ['foo'], favorite_domain: 'foo' },
                },
            ),
            {
                other: 'data',
                loginShown: false,
                profileShown: false,
            },
        );
    });

    it('should return set loginShown to false profileShown to true if action is LOGIN_SUCCESS and favorite_domain is not included in domains', function() {
        assert.deepEqual(
            userInterface(
                { other: 'data' },
                {
                    type: LOGIN_SUCCESS,
                    response: { domains: ['bar'], favorite_domain: 'foo' },
                },
            ),
            {
                other: 'data',
                loginShown: false,
                profileShown: true,
            },
        );
    });

    it('should set limiterShown to action.visibility if action is SHOW_SIDEBAR', function() {
        assert.deepEqual(
            userInterface(
                { limiterShown: false, other: 'data' },
                { type: SHOW_SIDEBAR, visibility: 'value' },
            ),
            { limiterShown: 'value', other: 'data' },
        );
    });

    it('should set historyShown to action.visibility if action is SHOW_HISTORY', function() {
        assert.deepEqual(
            userInterface(
                { historyShown: false, other: 'data' },
                { type: SHOW_HISTORY, visibility: 'value' },
            ),
            { historyShown: 'value', other: 'data' },
        );
    });

    it('should set historyShown to false and limiterShown to true if action is RELOAD_HISTORY or RESTORE_HISTORY', function() {
        assert.deepEqual(
            userInterface({ other: 'data' }, { type: RELOAD_HISTORY }),
            { historyShown: false, limiterShown: true, other: 'data' },
        );
        assert.deepEqual(
            userInterface({ other: 'data' }, { type: RESTORE_HISTORY }),
            { historyShown: false, limiterShown: true, other: 'data' },
        );
    });

    it('should set resultShown to false if action.visibility is false and action is SHOW_RESULT', function() {
        assert.deepEqual(
            userInterface(
                { other: 'data' },
                { type: SHOW_RESULT, visibility: false },
            ),
            { resultShown: false, other: 'data' },
        );
    });

    it('should set resultShown to true if action.visibility is true and action is SHOW_RESULT', function() {
        assert.deepEqual(
            userInterface(
                { other: 'data' },
                { type: SHOW_RESULT, visibility: true },
            ),
            { resultShown: true, other: 'data' },
        );
    });

    it('should set language to action.value if action is CHANGE_LANGUAGE', function() {
        assert.deepEqual(
            userInterface(
                { other: 'data' },
                { type: CHANGE_LANGUAGE, value: 'en' },
            ),
            { language: 'en', other: 'data' },
        );
    });

    it('should set resultShown to true when action is SEARCH_SUCCESS', function() {
        assert.deepEqual(
            userInterface(
                { resultShown: false, other: 'data' },
                { type: SEARCH_SUCCESS },
            ),
            { resultShown: true, other: 'data' },
        );
    });

    it('should set location to action.location when action is NAVIGATE', function() {
        assert.deepEqual(
            userInterface(
                { location: 'publication', other: 'data' },
                { type: NAVIGATE, location: 'article' },
            ),
            { location: 'article', other: 'data' },
        );
    });

    it('should set location to action.location when action is FULLSCREEN', function() {
        assert.deepEqual(
            userInterface(
                { fullScreen: true, other: 'data' },
                { type: FULLSCREEN, value: false },
            ),
            { fullScreen: false, other: 'data' },
        );
    });

    it('should set loginShown to true when action is SHOW_LOGIN', function() {
        assert.deepEqual(
            userInterface({ other: 'data' }, { type: SHOW_LOGIN }),
            { loginShown: true, other: 'data' },
        );
    });

    it('should set loginShown to true when action is HIDE_LOGIN', function() {
        assert.deepEqual(
            userInterface({ other: 'data' }, { type: HIDE_LOGIN }),
            { loginShown: false, other: 'data' },
        );
    });

    describe('INITIALIZE', function() {
        it('should set language to action.language and readOnlyLanguage to true and noticeBeingExported to []', function() {
            assert.deepEqual(
                userInterface(
                    { other: 'data' },
                    { type: INITIALIZE, language: 'en' },
                ),
                {
                    language: 'en',
                    readOnlyLanguage: true,
                    noticeBeingExported: [],
                    other: 'data',
                },
            );
        });

        it('should set language to defaultState.language and readOnlyLanguage to false if no action.language', function() {
            assert.deepEqual(
                userInterface({ other: 'data' }, { type: INITIALIZE }),
                {
                    language: defaultState.language,
                    readOnlyLanguage: false,
                    noticeBeingExported: [],
                    other: 'data',
                },
            );
        });

        it('should set location to action.location', function() {
            assert.deepEqual(
                userInterface(
                    { other: 'data' },
                    { type: INITIALIZE, location: 'publication' },
                ),
                {
                    language: defaultState.language,
                    readOnlyLanguage: false,
                    noticeBeingExported: [],
                    other: 'data',
                    location: 'publication',
                },
            );
        });
    });
});
