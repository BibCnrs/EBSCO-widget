import {
    ARTICLE,
    SET_HISTORY,
    DELETE_HISTORY,
    LOGOUT
} from '../../../lib/actions';
import history from '../../../lib/reducers/history';

describe('reducer history', function () {
    it('should return empty array as default state', function () {
        assert.deepEqual(history(undefined, {}), []);
    });

    describe('action SEARCH_SUCCESS', function () {

        it('should add action.query to state along with response.totalHits and response.activeFacets', function () {
            assert.deepEqual(
                history([{ term: 'phylloxera' }, { term: 'horton' }], {
                    type: ARTICLE.SEARCH_SUCCESS,
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
                    type: ARTICLE.SEARCH_SUCCESS,
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

        it('should not add action.query to state if it\'s totalhit is 0', function () {
            assert.deepEqual(
                history([{ term: 'phylloxera', activeFacets: [] }, { term: 'aids', activeFacets: [] }], {
                    type: ARTICLE.SEARCH_SUCCESS,
                    query: { term: 'aidswxcv' },
                    response: { totalHits: 0 }
                }),
                [
                    { term: 'phylloxera', activeFacets: [] },
                    { term: 'aids', activeFacets: [] }
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

    describe('action SET_HISTORY', function () {
        it('should set state with action.value', function () {
            assert.deepEqual(history(['current', 'history'], { type: SET_HISTORY, value: ['new', 'history'] }), ['new', 'history']);
        });
    });

});
