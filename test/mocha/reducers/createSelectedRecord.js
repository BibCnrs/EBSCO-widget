import { SELECT_RECORD } from '../../../lib/actions';
import createSelectedRecord, * as fromSelectedRecord from '../../../lib/reducers/createSelectedRecord';

describe('createSelectedRecord', function () {
    let selectedCategoryRecord;

    before(function () {
        console.log({createSelectedRecord});
        selectedCategoryRecord = createSelectedRecord('category');
    });

    it('should add action.id to state if action is SELECT_RECORD', function () {
        assert.deepEqual(selectedCategoryRecord([1, 2], {
            type: SELECT_RECORD,
            category: 'category',
            id: 64
        }), [1, 2, 64]);
    });

    it('should remove action.id from state if action is SELECT_RECORD and id is already present', function () {
        assert.deepEqual(selectedCategoryRecord([1, 64, 2], {
            type: SELECT_RECORD,
            category: 'category',
            id: 64
        }), [1, 2]);
    });

    it('should not change state if action.category is not category, even if action is SELECT_RECORD', function () {
        assert.deepEqual(selectedCategoryRecord([1, 2], {
            type: SELECT_RECORD,
            category: 'other category',
            id: 64
        }), [1, 2]);
    });

    describe('isRecordSelected', function () {
        it('should return true if the given id is in the given category', function () {
            assert.isTrue(fromSelectedRecord.isRecordSelected([1, 2, 3], 2));
        });

        it('should return false if the given id is not in the given category', function () {
            assert.isFalse(fromSelectedRecord.isRecordSelected([1, 3], 2));
        });
    });

    describe('getSelectedRecordIds', function () {
        it('should return the list of selected id for the given category', function () {
            assert.deepEqual(fromSelectedRecord.getSelectedRecordIds([1, 2, 3]), [1, 2, 3]);
        });
    });
});
