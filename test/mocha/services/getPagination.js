import getPagination from '../../../lib/services/getPagination';

describe('getPagination', function () {
    it('should return [ 1, 2, 3, 4, 5] if given 1, 10', function () {
        const expectedResult = [ 1, 2, 3, 4, 5];

        assert.deepEqual(getPagination(1, 10), expectedResult);
    });

    it('should return [ 1, 2, 3, 4, 5] if given 5, 10', function () {
        const expectedResult = [ 1, 2, 3, 4, 5];

        assert.deepEqual(getPagination(5, 10), expectedResult);
    });

    it('should return [ 6, 7, 8, 9, 10] if given 8, 10', function () {
        const expectedResult = [ 6, 7, 8, 9, 10];

        assert.deepEqual(getPagination(8, 10), expectedResult);
    });

    it('should return [ 96, 97, 98, 99, 100] if given 100, 105', function () {
        const expectedResult = [ 96, 97, 98, 99, 100];

        assert.deepEqual(getPagination(100, 105), expectedResult);
    });

    it('should return [ 41, 42, 43, 44, 45] if given 45, 50', function () {
        const expectedResult = [ 41, 42, 43, 44, 45];

        assert.deepEqual(getPagination(45, 50), expectedResult);
    });

    it('should return [ 41, 42, 43, 44] if given 43, 44', function () {
        const expectedResult = [41, 42, 43, 44];

        assert.deepEqual(getPagination(43, 44), expectedResult);
    });

    it('should return [ 1, 2] if given 1, 2', function () {
        const expectedResult = [1, 2];

        assert.deepEqual(getPagination(1, 2), expectedResult);
    });
});
