import getPagination from '../../../lib/services/getPagination';

describe('getPagination', function () {
    it('should return [ 1, 2, 3, 4, 5] if given 1', function () {
        const expectedResult = [ 1, 2, 3, 4, 5];

        assert.deepEqual(getPagination(1), expectedResult);
    });

    it('should return [ 1, 2, 3, 4, 5] if given 5', function () {
        const expectedResult = [ 1, 2, 3, 4, 5];

        assert.deepEqual(getPagination(5), expectedResult);
    });

    it('should return [ 6, 7, 8, 9, 10] if given 8', function () {
        const expectedResult = [ 6, 7, 8, 9, 10];

        assert.deepEqual(getPagination(8), expectedResult);
    });

    it('should return [ 96, 97, 98, 99, 100] if given 100', function () {
        const expectedResult = [ 96, 97, 98, 99, 100];

        assert.deepEqual(getPagination(100), expectedResult);
    });

    it('should return [ 41, 42, 43, 44, 45] if given 45', function () {
        const expectedResult = [ 41, 42, 43, 44, 45];

        assert.deepEqual(getPagination(45), expectedResult);
    });
});
