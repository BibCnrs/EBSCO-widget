import {
    SEARCH_SUCCESS,
    DELETE_HISTORY,
    LOGOUT
} from '../../../lib/actions';
import history, { getHistoryFromStorage } from '../../../lib/reducers/history';

describe('reducer history', function () {
    it('should return empty array as default state', function () {
        window.localStorage = {
            getItem: () => null
        };
        assert.deepEqual(history(undefined, {}), []);
        delete window.localStorage;
    });

    describe('action SEARCH_SUCCESS', function () {

        it('should add action.query to state along with response.totalHits and response.activeFacets', function () {
            assert.deepEqual(
                history([{ term: 'phylloxera' }, { term: 'horton' }], {
                    type: SEARCH_SUCCESS,
                    query: { term: 'aids' },
                    response: {
                        totalHits: 7,
                        activeFacets: ['active', 'facets']
                    }
                }),
                [
                    { term: 'aids', totalHits: 7, activeFacets: ['active', 'facets'] },
                    { term: 'phylloxera' },
                    { term: 'horton' }
                ]
            );
        });

        it('should not add action.query to state if it is already present in state but update its totalHits instead', function () {
            assert.deepEqual(
                history([{ term: 'phylloxera', activeFacets: [] }, { term: 'aids', activeFacets: [] }, { term: 'horton', activeFacets: [] }], {
                    type: SEARCH_SUCCESS,
                    query: { term: 'aids' },
                    response: { totalHits: 5 }
                }),
                [
                    { term: 'phylloxera', activeFacets: [] },
                    { term: 'aids', activeFacets: [], totalHits: 5 },
                    { term: 'horton', activeFacets: [] }
                ]
            );
        });
    });

    describe('action DELETE_HISTORY', function () {
        it('should remove query from history', function () {
            assert.deepEqual(
                history([{ term: 'phylloxera' }, { term: 'aids' }, { term: 'horton' }], {
                    type: DELETE_HISTORY,
                    query: { term: 'aids' }
                }),
                [{ term: 'phylloxera' }, { term: 'horton' }]
            );
        });

        it('should do nothing if query is not in history', function () {
            assert.deepEqual(
                history([{ term: 'phylloxera' }, { term: 'horton' }], {
                    type: DELETE_HISTORY,
                    query: { term: 'aids' }
                }),
                [{ term: 'phylloxera' }, { term: 'horton' }]
            );
        });

        it('should remove query from history even if totalHits does not match', function () {
            assert.deepEqual(
                history([{ term: 'phylloxera', totalHits: 5 }, { term: 'aids', totalHits: 5 }, { term: 'horton', totalHits: 5 }], {
                    type: DELETE_HISTORY,
                    query: { term: 'aids', totalHits: 7 }
                }),
                [{ term: 'phylloxera', totalHits: 5 }, { term: 'horton', totalHits: 5 }]
            );
        });
    });

    describe('action LOGOUT', function () {
        it('should return an empty array', function () {
            assert.deepEqual(
                history([{ term: 'phylloxera' }, { term: 'horton' }], {
                    type: LOGOUT
                }),
                []
            );
        });
    });

    describe('getHistoryFromStorage', function () {
        it('should return history stored in localStorage', function () {
            window.localStorage = {
                getItem: (name) => name === 'history' ? '[{ "a": "1" }, { "b": "2"}]' : null
            };
            assert.deepEqual(getHistoryFromStorage(), [{ a: '1' }, { b: '2'}]);
            delete window.localStorage;
        });
    });
});
