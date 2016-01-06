import { SEARCH_SUCCESS } from '../../../lib/actions';
import history, { getHistoryFromStorage } from '../../../lib/reducers/history';

describe.only('reducer history', function () {
    it('should return empty array as default state', function () {
        window.localStorage = {
            length: 0
        };
        assert.deepEqual(history(undefined, {}), []);
        delete window.localStorage;
    });

    describe('action SEARCH_SUCCESS', function () {

        it('should add action.query to state', function () {
            assert.deepEqual(history([{ term: 'phylloxera' }], { type: SEARCH_SUCCESS, query: { term: 'aids' }}), [{ term: 'phylloxera' }, { term: 'aids' }]);
        });

        it('should not add action.query to state if it is already present in state', function () {
            assert.deepEqual(history([{ term: 'phylloxera' }, { term: 'aids' }], { type: SEARCH_SUCCESS, query: { term: 'aids' }}), [{ term: 'phylloxera' }, { term: 'aids' }]);
        });
    });

    describe('getHistoryFromStorage', function () {
        const keys = [ 'debug', 'query{ "a": 1 }', 'query{ "b": 2 }', '{ "c": 3 }' ];
        it('should return history stored in localStorage', function () {
            window.localStorage = {
                length: 4,
                key: (i) => keys[i]
            };
            assert.deepEqual(getHistoryFromStorage(), [{ a: 1 }, { b: 2}]);
            delete window.localStorage;
        });
    });
});
