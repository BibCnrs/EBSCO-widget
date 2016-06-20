import { createSelectedRecord, isSelected, getSelected } from '../../../lib/reducers/selectedRecord';

import {
    SELECT_RECORD
} from '../../../lib/actions';

describe('reducers selectedRecord', function () {
    let selectedCategoryRecord;
    before(function () {
        selectedCategoryRecord = createSelectedRecord('category');
    });

    it('should add action.id to the state array, if it is not already in it if action is SELECT_RECORD', function () {
        const state = selectedCategoryRecord([1, 2], { type: SELECT_RECORD, category: 'category', id: 5});
        assert.deepEqual(state, [1, 2, 5]);
    });

    it('should remove action.id from the state array, if it is in it if action is SELECT_RECORD', function () {
        const state = selectedCategoryRecord([1, 5, 2], { type: SELECT_RECORD, category: 'category', id: 5});
        assert.deepEqual(state, [1, 2]);
    });

    it('should return current state id action.category is not "category"', function () {
        const state = selectedCategoryRecord([1, 2], { type: SELECT_RECORD, category: 'other category', id: 5});
        assert.deepEqual(state, [1, 2]);
    });

    describe('isSelected', function () {
        it('should return true if the given id is in the given category', function () {
            assert.isTrue(isSelected({ category: [1, 2, 3]}, 'category', 2));
        });

        it('should return false if the given id is not in the given category', function () {
            assert.isFalse(isSelected({ category: [1, 3]}, 'category', 2));
        });
    });
});
