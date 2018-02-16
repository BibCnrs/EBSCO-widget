import hasChanged from '../../../lib/services/hasChanged';

describe('hasChanged', function() {
    it('should return false if the two value are identical', function() {
        assert.isFalse(hasChanged(10, 10));
        assert.isFalse(hasChanged('hello', 'hello'));
        assert.isFalse(hasChanged({ a: 1 }, { a: 1 }));
        assert.isFalse(hasChanged([1, 2], [1, 2]));
    });

    it('should return true if the two value are different', function() {
        assert.isTrue(hasChanged(10, 11));
        assert.isTrue(hasChanged('hello', 'hell1'));
        assert.isTrue(hasChanged({ a: 1 }, { a: 2 }));
        assert.isTrue(hasChanged([1, 2], [1, 2, 3]));
        assert.isTrue(hasChanged([1, 2], [1, 3]));
    });

    it('should return false if the two value are array with same element in different order', function() {
        assert.isFalse(hasChanged([1, 2], [2, 1]));
        assert.isFalse(hasChanged([1, 2, 3], [3, 2, 1]));
        assert.isFalse(hasChanged([1, 3, 2], [1, 2, 3]));
    });
});
