import getActiveFacetValues from '../../../lib/services/getActiveFacetValues';

describe('getActiveFacetValues', function () {

    const activeFacets = {
        Language: ['french', 'english'],
        Category: ['education', 'administration', 'general']
    };

    it('should return an array with { id: key, value}', function () {
        assert.deepEqual(getActiveFacetValues(activeFacets), [
            { id: 'Language', value: 'french', checked: true },
            { id: 'Language', value: 'english', checked: true },
            { id: 'Category', value: 'education', checked: true },
            { id: 'Category', value: 'administration', checked: true },
            { id: 'Category', value: 'general', checked: true }
        ]);
    });

    it('should return empty array if called with nothing', function () {
        assert.deepEqual(getActiveFacetValues(), []);
    });

});
