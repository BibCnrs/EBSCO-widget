import createSearch, { defaultState } from '../../../lib/reducers/createSearch';

import {
    LOGOUT,
    RELOAD_HISTORY,
    RESTORE_HISTORY,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    CHANGE_SORT,
    LINKED_SEARCH,
    SEARCH_LETTERS,
    CHANGE_TERM,
    CHANGE_FIELD,
    CHANGE_RESULTS_PER_PAGE
} from '../../../lib/actions';

describe.only('reducers createSearch', function () {
    let categorySearch;

    before(function () {
        categorySearch = createSearch('category');
    });

    it('should set firstLetter and secondLetter to Action.firstLetter and action.secondLetter when action is SEARCH_LETTERS', function () {
        const searchState = categorySearch(
            { status: 'NONE' },
            { type: SEARCH_LETTERS, category: 'category', firstLetter: 'A', secondLetter: 'Z' }
        );
        assert.deepEqual(searchState, {
            status: 'NONE',
            firstLetter: 'A',
            secondLetter: 'Z'
        });

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

    it('should return state completed by action.query if action is RESTORE_HISTORY or RELOAD_HISTORY', function () {
        assert.deepEqual(
            categorySearch(
                { status: 'state', queries: [1, 2, 3] },
                {
                    type: RELOAD_HISTORY,
                    category: 'category',
                    query: { queries: [{ term: 'term', peerReviewedArticle: true, publicationDate: { from: 1914, to: 1918 } }]}
                }
            ),
            {
                status: 'state',
                queries: [{ term: 'term', peerReviewedArticle: true, publicationDate: { from: 1914, to: 1918 } }]
            }
        );
        assert.deepEqual(
            categorySearch(
                { status: 'state', queries: [1, 2, 3] },
                {
                    type: RESTORE_HISTORY,
                    category: 'category',
                    query: { queries: [{ term: 'term', peerReviewedArticle: true, publicationDate: { from: 1914, to: 1918 } }]}
                }
            ),
            {
                status: 'state',
                queries: [{ term: 'term', peerReviewedArticle: true, publicationDate: { from: 1914, to: 1918 } }]
            }
        );
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

    it('should update term with action.term if action is PUBLICATION_CHANGE_TERM', function () {
        const searchState = categorySearch(
            { status: 'state' },
            { type: CHANGE_TERM, category: 'category', term: 'searched term' }
        );
        assert.deepEqual(searchState, { status: 'state', term: 'searched term' });
    });

    it('should set field to action.value if type is PUBLICATION_CHANGE_FIELD', function () {
        assert.deepEqual(
            categorySearch(
                { status: 'state', field: 'TI' },
                { type: CHANGE_FIELD, category: 'category', value: 'AU' }
            ),
            { status: 'state', field: 'AU' }
        );
    });



    describe('type: LINKED_SEARCH', function () {

        it('should change queries to a single query with term= `action.term action.field`', function () {
            const state = { status: 'state', queries:  [1, 2, 3]};
            const searchState = categorySearch(
                state,
                { type: LINKED_SEARCH, category: 'category', term: 'term', field: 'EX' }
            );
            assert.deepEqual(searchState, {
                ...state,
                queries: [{ boolean: 'AND', field: null, term: 'EX term' }]
            });
        });

        it('should change queries to a single query with term=`action.term` and field=`action.field` if action.field is in the availableFields', function () {
            const state = { status: 'state', queries:  [1, 2, 3] };
            const searchState = categorySearch(
                state,
                { type: LINKED_SEARCH, category: 'category', term: 'term', field: 'TI' }
            );
            assert.deepEqual(searchState, {
                ...state,
                queries: [{ boolean: 'AND', field: 'TI', term: 'term' }]
            });
        });
    });
});
