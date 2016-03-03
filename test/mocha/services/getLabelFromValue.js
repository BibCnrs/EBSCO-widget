import getLabelFromValue from '../../../lib/services/getLabelFromValue';

describe('getLabelFromValue', function () {
    it('should return the label corresponding to the current value', function () {
        assert.equal(getLabelFromValue('fieldValue', [
            { value: 1, label: 'a' },
            { value: 'fieldValue', label: 'fieldLabel' },
            { value: 2, label: 'b' }
        ]), 'fieldLabel');
    });

    it('should return "" if no labelcorrespond to the current value', function () {
        assert.equal(getLabelFromValue('fieldValue', [
            { value: 1, label: 'a' },
            { value: 2, label: 'b' }
        ]), '');
    });
});
