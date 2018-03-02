import {
    SELECT_RECORD,
    SELECT_PAGE,
    SEARCH,
    LIMIT_SEARCH,
    CHANGE_RESULTS_PER_PAGE,
    CHANGE_SORT,
    RELOAD_HISTORY,
    LINKED_SEARCH,
    LOGOUT,
} from '../../../lib/actions';
import createSelectedRecord, * as fromSelectedRecord from '../../../lib/reducers/createSelectedRecord';

describe('createSelectedRecord', function() {
    let selectedCategoryRecord;

    before(function() {
        selectedCategoryRecord = createSelectedRecord('category');
    });

    it('should not change state if action.category is not category', function() {
        const types = [
            SELECT_RECORD,
            SELECT_PAGE,
            SEARCH,
            LIMIT_SEARCH,
            CHANGE_RESULTS_PER_PAGE,
            CHANGE_SORT,
            RELOAD_HISTORY,
            LINKED_SEARCH,
        ];

        types.forEach(type => {
            assert.deepEqual(
                selectedCategoryRecord([1, 2], {
                    type,
                    category: 'other category',
                    id: 64,
                    ids: [64],
                }),
                [1, 2],
            );
        });
    });

    describe('SELECT_RECORD', () => {
        it('should add action.id to state if action is SELECT_RECORD', function() {
            assert.deepEqual(
                selectedCategoryRecord([1, 2], {
                    type: SELECT_RECORD,
                    category: 'category',
                    id: 64,
                }),
                [1, 2, 64],
            );
        });

        it('should remove action.id from state if action is SELECT_RECORD and id is already present', function() {
            assert.deepEqual(
                selectedCategoryRecord([1, 64, 2], {
                    type: SELECT_RECORD,
                    category: 'category',
                    id: 64,
                }),
                [1, 2],
            );
        });
    });

    describe('SELECT_PAGE', () => {
        it('should add ids to selected records', () => {
            assert.deepEqual(
                selectedCategoryRecord([7], {
                    type: SELECT_PAGE,
                    category: 'category',
                    ids: [1, 2, 3, 4, 5],
                }),
                [7, 1, 2, 3, 4, 5],
            );
        });

        it('should add missing ids to selected records', () => {
            assert.deepEqual(
                selectedCategoryRecord([1, 2], {
                    type: SELECT_PAGE,
                    category: 'category',
                    ids: [1, 2, 3, 4, 5],
                }),
                [1, 2, 3, 4, 5],
            );
        });

        it('should remove all ids from selected records if they are all selected', () => {
            assert.deepEqual(
                selectedCategoryRecord([1, 2, 3, 4, 5], {
                    type: SELECT_PAGE,
                    category: 'category',
                    ids: [1, 2, 3, 4, 5],
                }),
                [],
            );
        });
    });

    describe('reset actions', () => {
        it('should return an empty array if action it a reset action', () => {
            const resetTypes = [
                SEARCH,
                LIMIT_SEARCH,
                CHANGE_RESULTS_PER_PAGE,
                CHANGE_SORT,
                RELOAD_HISTORY,
                LINKED_SEARCH,
            ];

            resetTypes.forEach(type => {
                assert.deepEqual(
                    selectedCategoryRecord([1, 2, 3], {
                        type,
                        category: 'category',
                    }),
                    [],
                );
            });
        });
    });

    describe('LOGOUT', () => {
        it('should return an empty array for all no matter the category', () => {
            assert.deepEqual(
                selectedCategoryRecord([1, 2, 3], {
                    type: LOGOUT,
                }),
                [],
            );
        });
    });

    describe('selectors', () => {
        describe('isRecordSelected', function() {
            it('should return true if the given id is in the given category', function() {
                assert.isTrue(
                    fromSelectedRecord.isRecordSelected([1, 2, 3], 2),
                );
            });

            it('should return true if all the given ids are in selected', function() {
                assert.isTrue(
                    fromSelectedRecord.isRecordSelected([1, 2, 3], [1, 2]),
                );
            });

            it('should return false if the given id is not in the given category', function() {
                assert.isFalse(fromSelectedRecord.isRecordSelected([1, 3], 2));
            });

            it('should return false if all the given ids are not in the given category', function() {
                assert.isFalse(
                    fromSelectedRecord.isRecordSelected(
                        [2, 3, 4, 5, 6, 7, 8, 9, 10],
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    ),
                );
            });
        });

        describe('getSelectedRecordIds', function() {
            it('should return the list of selected id for the given category', function() {
                assert.deepEqual(
                    fromSelectedRecord.getSelectedRecordIds([1, 2, 3]),
                    [1, 2, 3],
                );
            });
        });
    });
});
