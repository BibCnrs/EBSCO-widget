import { getFieldLabel, fieldSelector } from '../../../lib/selectors/fieldSelector';

describe('fieldSelector', function () {
    describe('getFieldLabel', function () {
        it('should return the label corresponding to the current value', function () {
            assert.equal(getFieldLabel('fieldValue', [
                { value: 1, label: 'a' },
                { value: 'fieldValue', label: 'fieldLabel' },
                { value: 2, label: 'b' }
            ]), 'fieldLabel');
        });

        it('should return "" if no labelcorrespond to the current value', function () {
            assert.equal(getFieldLabel('fieldValue', [
                { value: 1, label: 'a' },
                { value: 2, label: 'b' }
            ]), '');
        });
    });

    describe('fieldSelector', function() {
        it('should return availableFields and label for field', function () {
            const searchState = {
                field: 'TI',
                availableFields: [
                    { value: 'AU', label: 'auteur' },
                    { value: 'TI', label: 'title' }
                ]
            };
            assert.deepEqual(fieldSelector(searchState), {
                field: 'title',
                availableFields: searchState.availableFields
            });
        });
    });
});
