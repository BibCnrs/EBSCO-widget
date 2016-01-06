import history, { getHistoryFromStorage } from '../../../lib/reducers/history';

describe('reducer history', function () {
    it('should return empty array as default state', function () {
        window.localStorage = {
            length: 0
        };
        assert.deepEqual(history(undefined, {}), []);
        delete window.localStorage;
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
