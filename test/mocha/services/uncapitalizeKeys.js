import uncapitalizeKeys from '../../../lib/services/uncapitalizeKeys';

describe('uncapitalizeKeys', function () {

    it('should uncapitalize object keys', function () {
        assert.deepEqual(uncapitalizeKeys({
            Capitalized: 1,
            unCapitalized: 2
        }), {
            capitalized: 1,
            unCapitalized: 2
        });
    });

    it('should work recursively', function () {
        assert.deepEqual(uncapitalizeKeys({
            Capitalized: {
                Capitalized: 1,
                unCapitalized: 2
            },
            unCapitalized: 2
        }), {
            capitalized: {
                capitalized: 1,
                unCapitalized: 2
            },
            unCapitalized: 2
        });
    });

    it('should work with array', function () {
        assert.deepEqual(uncapitalizeKeys([{
            Capitalized: 1,
            unCapitalized: 2
        }]), [{
            capitalized: 1,
            unCapitalized: 2
        }]);
    });

    it('should return given value if not an object nor array', function () {
        assert.deepEqual(uncapitalizeKeys('A Value'), 'A Value');
    });
});
