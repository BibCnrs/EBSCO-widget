import createSearch, { defaultState } from '../../../lib/reducers/createSearch';

import {
    LOGOUT,
    INITIALIZE,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    CHANGE_SORT,
    CHANGE_RESULTS_PER_PAGE,
    A2Z_SEARCH,
} from '../../../lib/actions';

describe('reducers createSearch', function() {
    let categorySearch;

    describe('actions', function() {
        before(function() {
            categorySearch = createSearch('category');
        });

        describe('CHANGE_RESULTS_PER_PAGE', function() {
            it('should set resultsPerPage to Action.nbResults', function() {
                const searchState = categorySearch(
                    { status: 'NONE' },
                    {
                        type: CHANGE_RESULTS_PER_PAGE,
                        category: 'category',
                        nbResults: 50,
                    },
                );
                assert.deepEqual(searchState, {
                    status: 'NONE',
                    resultsPerPage: 50,
                });
            });
        });

        describe('SEARCH_PENDING', function() {
            it('should return PENDING', function() {
                const searchState = categorySearch(
                    { term: 'my search', status: 'NONE' },
                    { type: SEARCH_PENDING, category: 'category' },
                );
                assert.deepEqual(searchState, {
                    term: 'my search',
                    status: 'PENDING',
                });
            });
        });

        describe('SEARCH_ERROR', function() {
            it('should return DONE', function() {
                const searchState = categorySearch(
                    { status: 'NONE' },
                    {
                        type: SEARCH_ERROR,
                        category: 'category',
                        error: { message: 'boom' },
                    },
                );
                assert.deepEqual(searchState, {
                    status: 'DONE',
                });
            });
        });

        describe('LOGOUT', function() {
            it('should return default state', function() {
                const searchState = categorySearch(
                    { status: 'state' },
                    { type: LOGOUT },
                );
                assert.deepEqual(searchState, defaultState['category']);
            });
        });

        describe('INITIALIZE', function() {
            it('should set status to NONE', function() {
                const searchState = categorySearch(
                    { status: 'state' },
                    { type: INITIALIZE },
                );
                assert.deepEqual(searchState, { status: 'NONE' });
            });
        });

        describe('CHANGE_SORT', function() {
            it('should return state with sort set as action.value', function() {
                const searchState = categorySearch(
                    { status: 'state' },
                    { type: CHANGE_SORT, category: 'category', value: 'date' },
                );
                assert.deepEqual(searchState, {
                    status: 'state',
                    sort: 'date',
                });
            });
        });

        describe('SEARCH_SUCCESS', function() {
            it('should return DONE and set daterange if action is SEARCH_SUCCESS', function() {
                const searchState = categorySearch(
                    { status: 'NONE', term: 'aids' },
                    {
                        type: SEARCH_SUCCESS,
                        category: 'category',
                        response: {
                            dateRange: 'date range',
                        },
                    },
                );
                assert.deepEqual(searchState, {
                    status: 'DONE',
                    term: 'aids',
                    dateRange: 'date range',
                });
            });
        });

        describe('A2Z_SEARCH', () => {
            it('should set sort to title', () => {
                const searchState = categorySearch(
                    { foo: 'bar' },
                    {
                        type: A2Z_SEARCH,
                        category: 'category',
                    },
                );
                assert.deepEqual(searchState, {
                    foo: 'bar',
                    sort: 'title',
                });
            });
        });
    });
});
