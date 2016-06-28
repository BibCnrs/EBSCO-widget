import createSearch, { defaultState } from '../../../lib/reducers/createSearch';

import {
    LOGOUT,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    CHANGE_SORT,
    CHANGE_RESULTS_PER_PAGE
} from '../../../lib/actions';

describe('reducers createSearch', function () {
    let categorySearch;

    before(function () {
        categorySearch = createSearch('category');
    });

    it('should set resultsPerPage to Action.nbResults when action is CHANGE_RESULTS_PER_PAGE', function () {
        const searchState = categorySearch(
            { status: 'NONE' },
            { type: CHANGE_RESULTS_PER_PAGE, category: 'category', nbResults: 50 }
        );
        assert.deepEqual(searchState, {
            status: 'NONE',
            resultsPerPage: 50
        });
    });

    it('should return PENDING if action is SEARCH_PENDING', function () {
        const searchState = categorySearch(
            { term: 'my search', status: 'NONE' },
            { type: SEARCH_PENDING, category: 'category' }
        );
        assert.deepEqual(searchState, {
            term: 'my search',
            status: 'PENDING'
        });
    });

    it('should return DONE if action is SEARCH_ERROR', function () {
        const searchState = categorySearch(
            { status: 'NONE' },
            { type: SEARCH_ERROR, category: 'category', error: { message: 'boom' } }
        );
        assert.deepEqual(searchState, {
            status: 'DONE'
        });
    });

    it('should return default state if action is LOGOUT', function () {
        const searchState = categorySearch(
            { status: 'state' },
            { type: LOGOUT, category: 'category' }
        );
        assert.deepEqual(searchState, defaultState['category']);
    });

    it('should return state with sort set as action.value if action is CHANGE_SORT', function () {
        const searchState = categorySearch(
            { status: 'state' },
            { type: CHANGE_SORT, category: 'category', value: 'date' }
        );
        assert.deepEqual(searchState, { status: 'state', sort: 'date' });
    });

    it('should return DONE and set daterange if action is PUBLICATION_SEARCH_SUCCESS', function () {
        const searchState = categorySearch(
            { status: 'NONE', term: 'aids' },
            {
                type: SEARCH_SUCCESS,
                category: 'category',
                response: {
                    dateRange: 'date range'
                }
            }
        );
        assert.deepEqual(searchState, {
            status: 'DONE',
            term: 'aids',
            dateRange: 'date range'
        });
    });
});
