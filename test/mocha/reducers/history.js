import actions, {
    API_LOAD_HISTORY_PAGE_SUCCESS,
    SEARCH_SUCCESS,
    LOGOUT,
    DELETE_HISTORY,
    SET_HISTORY,
} from '../../../lib/actions';

import history, { defaultState } from '../../../lib/reducers/history';

describe('reducer history', function() {
    it('should return empty array as default state', function() {
        assert.deepEqual(history(undefined, {}), defaultState);
    });

    describe('action SEARCH_SUCCESS', function() {
        it('should add action.query to state along with response.totalHits and response.activeFacets', function() {
            assert.deepEqual(
                history(
                    {
                        queries: [
                            { queries: { term: 'phylloxera' } },
                            { queries: { term: 'horton' } },
                        ],
                    },
                    {
                        type: SEARCH_SUCCESS,
                        category: 'article',
                        query: { queries: { term: 'aids' } },
                        response: {
                            totalHits: 7,
                            activeFacets: ['active', 'facets'],
                        },
                    },
                ),
                {
                    queries: [
                        {
                            queries: { term: 'aids' },
                            totalHits: 7,
                            activeFacets: ['active', 'facets'],
                        },
                        { queries: { term: 'phylloxera' } },
                        { queries: { term: 'horton' } },
                    ],
                },
            );
        });

        it('should not add action.query to state if category is not article', function() {
            assert.deepEqual(
                history(
                    {
                        queries: [
                            { queries: { term: 'phylloxera' } },
                            { queries: { term: 'horton' } },
                        ],
                    },
                    {
                        type: SEARCH_SUCCESS,
                        category: 'publication',
                        query: { queries: { term: 'aids' } },
                        response: {
                            totalHits: 7,
                            activeFacets: ['active', 'facets'],
                        },
                    },
                ),
                {
                    queries: [
                        { queries: { term: 'phylloxera' } },
                        { queries: { term: 'horton' } },
                    ],
                },
            );
        });

        it('should not add action.query to state if it is already present in state but update its totalHits instead', function() {
            assert.deepEqual(
                history(
                    {
                        queries: [
                            {
                                queries: {
                                    term: 'phylloxera',
                                },
                                activeFacets: [],
                            },
                            { queries: { term: 'aids' }, activeFacets: [] },
                            { queries: { term: 'horton' }, activeFacets: [] },
                        ],
                    },
                    {
                        type: SEARCH_SUCCESS,
                        category: 'article',
                        query: { queries: { term: 'aids' }, activeFacets: [] },
                        response: { totalHits: 5 },
                    },
                ),
                {
                    queries: [
                        { queries: { term: 'phylloxera' }, activeFacets: [] },
                        {
                            queries: {
                                term: 'aids',
                            },
                            activeFacets: [],
                            totalHits: 5,
                        },
                        { queries: { term: 'horton' }, activeFacets: [] },
                    ],
                },
            );
        });

        it("should not add action.query to state if it's totalhit is 0", function() {
            assert.deepEqual(
                history(
                    {
                        queries: [
                            { term: 'phylloxera', activeFacets: [] },
                            { term: 'aids', activeFacets: [] },
                        ],
                    },
                    {
                        type: SEARCH_SUCCESS,
                        category: 'article',
                        query: { term: 'aidswxcv' },
                        response: { totalHits: 0 },
                    },
                ),
                {
                    queries: [
                        { term: 'phylloxera', activeFacets: [] },
                        { term: 'aids', activeFacets: [] },
                    ],
                },
            );
        });
    });

    describe('action DELETE_HISTORY', function() {
        it('should remove query from history', function() {
            assert.deepEqual(
                history(
                    {
                        queries: [
                            { queries: { term: 'phylloxera' } },
                            { queries: { term: 'aids' } },
                            { queries: { term: 'horton' } },
                        ],
                    },
                    {
                        type: DELETE_HISTORY,
                        query: { queries: { term: 'aids' } },
                    },
                ),
                {
                    queries: [
                        { queries: { term: 'phylloxera' } },
                        { queries: { term: 'horton' } },
                    ],
                    totalCountAlert: 0,
                    totalCountSearch: 0,
                },
            );
        });

        it('should do nothing if query is not in history', function() {
            assert.deepEqual(
                history(
                    {
                        queries: [
                            { queries: { term: 'phylloxera' } },
                            { queries: { term: 'horton' } },
                        ],
                    },
                    {
                        type: DELETE_HISTORY,
                        query: { queries: { term: 'aids' } },
                    },
                ),
                {
                    queries: [
                        { queries: { term: 'phylloxera' } },
                        { queries: { term: 'horton' } },
                    ],
                },
            );
        });

        it.skip('should remove query from history even if totalHits does not match', function() {
            assert.deepEqual(
                history(
                    {
                        queries: [
                            { queries: { term: 'phylloxera' }, totalHits: 5 },
                            { queries: { term: 'aids' }, totalHits: 5 },
                            { queries: { term: 'horton' }, totalHits: 5 },
                        ],
                    },
                    {
                        type: DELETE_HISTORY,
                        query: { queries: { term: 'aids' }, totalHits: 7 },
                    },
                ),
                {
                    queries: [
                        { queries: { term: 'phylloxera' }, totalHits: 5 },
                        { queries: { term: 'horton' }, totalHits: 5 },
                    ],
                },
            );
        });
    });

    describe('action LOGOUT', function() {
        it('should return an empty array', function() {
            assert.deepEqual(
                history(
                    { queries: [{ term: 'phylloxera' }, { term: 'horton' }] },
                    {
                        type: LOGOUT,
                    },
                ),
                {
                    queries: [],
                    currentPage: 1,
                    maxPage: 1,
                    totalCount: 0,
                    totalCountSearch: 0,
                    totalCountAlert: 0,
                },
            );
        });
    });

    describe('action SET_HISTORY', function() {
        it('should set state with action.value', function() {
            assert.deepEqual(
                history(
                    {
                        queries: ['current', 'history'],
                    },
                    {
                        type: SET_HISTORY,
                        value: { queries: ['new', 'history'] },
                    },
                ),
                {
                    queries: ['new', 'history'],
                },
            );
        });
    });

    describe('action API_LOAD_HISTORY_PAGE_SUCCESS', function() {
        it.skip('should set state with action.value', function() {
            assert.deepEqual(
                history(
                    {
                        queries: ['current', 'history'],
                    },
                    {
                        type: API_LOAD_HISTORY_PAGE_SUCCESS,
                        page: 2,
                        history: [
                            {
                                id: 42,
                                event: { foo: 42 },
                                totalCount: 12,
                            },
                            {
                                id: 14,
                                event: { foo: 14 },
                                totalCount: 12,
                            },
                        ],
                    },
                ),
                {
                    currentPage: 2,
                    maxPage: 3,
                    queries: [
                        {
                            id: 42,
                            foo: 42,
                            totalCount: 12,
                        },
                        {
                            id: 14,
                            foo: 14,
                            totalCount: 12,
                        },
                    ],
                },
            );
        });
    });

    describe('SAVE_ALERT', () => {
        it('should set alert for history id', () => {
            assert.deepEqual(
                history(
                    {
                        queries: [{ id: 4 }, { id: 5 }, { id: 6 }],
                    },
                    actions.saveAlert(5, 'month'),
                ),
                {
                    queries: [
                        { id: 4 },
                        {
                            id: 5,
                            frequence: 'month',
                            hasAlert: true,
                            active: true,
                        },
                        { id: 6 },
                    ],
                    totalCountAlert: 1,
                },
            );
        });
    });

    describe('REMOVE_ALERT', () => {
        it('should set alert for history id', () => {
            assert.deepEqual(
                history(
                    {
                        queries: [
                            { id: 4 },
                            { id: 5, frequence: 'month', hasAlert: true },
                            { id: 6 },
                        ],
                    },
                    actions.removeAlert(5),
                ),
                {
                    queries: [
                        { id: 4 },
                        { id: 5, frequence: 'week', hasAlert: false },
                        { id: 6 },
                    ],
                },
            );
        });
    });
});
