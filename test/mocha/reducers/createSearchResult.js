import createSearchResult, * as fromSearchResult from '../../../lib/reducers/createSearchResult';

import {
    SEARCH_SUCCESS,
    SEARCH_TERM,
    LIMIT_SEARCH,
    PAGE_LOAD,
    CHANGE_RESULTS_PER_PAGE,
    RELOAD_HISTORY,
    LOGOUT
} from '../../../lib/actions';

describe('reducers createSearchResult', function () {
    let categorySearchResult;

    before(function () {
        categorySearchResult = createSearchResult('category');
    });

    it('should set [action.response.currentPage] to action.response.results if action is SEARCH_SUCCESS', function () {
        assert.deepEqual(
            categorySearchResult({
                maxPage: 0,
                1: 'other page'
            }, {
                type: SEARCH_SUCCESS,
                category: 'category',
                response: {
                    maxPage: 10,
                    totalHits: 200,
                    results: ['results data'],
                    currentPage: 2
                }
            }),
            {
                maxPage: 10,
                totalHits: 200,
                1: 'other page',
                2: ['results data'],
                currentPage: 2
            }
        );
    });

    it('should return default state if action is ARTICLE_SEARCH_TERM, ARTICLE_LIMIT_SEARCH, RELOAD_HISTORY, LOGOUT or TRIGGER_EBSCO_ACTION', function () {
        const actionTypes = [
            SEARCH_TERM,
            LIMIT_SEARCH,
            CHANGE_RESULTS_PER_PAGE,
            RELOAD_HISTORY,
            LOGOUT
        ];

        actionTypes.map((type) => assert.deepEqual(
            categorySearchResult({
                maxPage: 10,
                totalHits: 200,
                2: ['results data'],
                currentPage: 2
            }, { type, category: 'category' }),
            fromSearchResult.defaultState
        ));
    });

    it('should set currentPage to action.page if action is PAGE_LOAD', function () {
        assert.deepEqual(
            categorySearchResult({ maxPage: 0 }, {
                type: PAGE_LOAD,
                category: 'category',
                page: 7
            }),
            {
                maxPage: 0,
                currentPage: 7
            }
        );
    });

    it('should return state on other action', function () {
        assert.deepEqual(
            categorySearchResult({ some: 'state' }, {
                type: 'OTHER_ACTION',
                category: 'category'
            }),
            { some: 'state' }
        );
    });

    describe('selector', function () {

        describe('getCurrentPage', function () {

            it('should return currentPage', function () {
                assert.equal(fromSearchResult.getCurrentPage({
                    currentPage: 64,
                    64: 'currentPage records',
                    65: 'otherPage records'
                }), 'currentPage records');
            });

            it('should return undefined if no currentPage', function () {
                assert.isUndefined(fromSearchResult.getCurrentPage({
                    currentPage: null,
                    64: 'currentPage',
                    65: 'otherPage'
                }));
            });
        });

        describe('getPaginationData', function () {

            it('should return pagination information', function () {
                const paginationData = fromSearchResult.getPaginationData({
                    currentPage: 64,
                    totalHits: 197,
                    maxPage: 65,
                    1: [
                        { id: 1 },
                        { id: 2 },
                        { id: 3 }
                    ],
                    64: [
                        { id: 192 },
                        { id: 193 },
                        { id: 194 }
                    ],
                    65: [
                        { id: 195 },
                        { id: 196 },
                        { id: 197 }
                    ]
                });

                assert.deepEqual(paginationData, {
                    first: 192,
                    last: 194,
                    totalHits: 197,
                    maxPage: 65,
                    currentPage: 64
                });
            });
        });
    });
});