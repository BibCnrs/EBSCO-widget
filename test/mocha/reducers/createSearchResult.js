import createSearchResult, * as fromSearchResult from '../../../lib/reducers/createSearchResult';

import {
    SEARCH_SUCCESS,
    SEARCH_TERM,
    LIMIT_SEARCH,
    PAGE_LOAD,
    CHANGE_RESULTS_PER_PAGE,
    RELOAD_HISTORY,
    RETRIEVE_SUCCESS,
    LOGOUT
} from '../../../lib/actions';

describe('reducers createSearchResult', function () {

    describe('actions type:', function () {

        let categorySearchResult;

        before(function () {
            categorySearchResult = createSearchResult('category');
        });

        describe('SEARCH_SUCCESS', function () {

            it('should set [action.response.currentPage] to action.response.results[].id', function () {
                assert.deepEqual(
                    categorySearchResult({
                        maxPage: 0,
                        currentPage: 1,
                        1: [1, 2, 3],
                        byId: {
                            1: { id: 1 },
                            2: { id: 2 },
                            3: { id: 3 }
                        }
                    }, {
                        type: SEARCH_SUCCESS,
                        category: 'category',
                        response: {
                            maxPage: 10,
                            totalHits: 200,
                            results: [
                                { id: 4 },
                                { id: 5 },
                                { id: 6 }
                            ],
                            currentPage: 2
                        }
                    }),
                    {
                        maxPage: 10,
                        totalHits: 200,
                        1: [1, 2, 3],
                        2: [4, 5, 6],
                        byId: {
                            1: { id: 1 },
                            2: { id: 2 },
                            3: { id: 3 },
                            4: { id: 4 },
                            5: { id: 5 },
                            6: { id: 6 }
                        },
                        currentPage: 2
                    }
                );
            });
        });

        [
            SEARCH_TERM,
            LIMIT_SEARCH,
            CHANGE_RESULTS_PER_PAGE,
            RELOAD_HISTORY,
            LOGOUT
        ].forEach(type => {
            describe(type, function () {
                it('should return default state', function () {
                    assert.deepEqual(
                        categorySearchResult({
                            maxPage: 10,
                            totalHits: 200,
                            2: ['results data'],
                            currentPage: 2
                        }, { type, category: 'category' }),
                        fromSearchResult.defaultState
                    );
                });
            });
        });

        describe('PAGE_LOAD', function () {

            it('should set currentPage to action.page if action', function () {
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

        describe('RETRIEVE_SUCCESS', function () {
            let articleSearchResult;
            before(function () {
                articleSearchResult = createSearchResult('article');
            });

            it('should return given stat if category is not article', function () {
                assert.deepEqual(
                    categorySearchResult({ some: 'state' }, {
                        type: RETRIEVE_SUCCESS,
                        category: 'category'
                    }),
                    { some: 'state' }
                );
            });

            it('should set corresponding articleLinks to action.response.articleLinks', function () {
                assert.deepEqual(
                    articleSearchResult({
                        byId: {
                            7: {}
                        }
                    }, {
                        type: RETRIEVE_SUCCESS,
                        category: 'article',
                        id: '7',
                        response: {
                            articleLinks: {
                                fullTextLinks: ['fulltext'],
                                pdfLinks: [],
                                urls: []
                            }
                        }
                    }),
                    {
                        byId: {
                            7: {
                                articleLinks: {
                                    fullTextLinks: ['fulltext'],
                                    pdfLinks: [],
                                    urls: []
                                }
                            }
                        }
                    }
                );
            });

            it('should set corresponding articleLinks to null action.response.articleLinks contain only emptyArray', function () {
                assert.deepEqual(
                    articleSearchResult({
                        byId: {
                            '7': {
                                articleLinks: {
                                    fullTextLinks: [],
                                    pdfLinks: [],
                                    urls: []
                                }
                            }
                        }
                    }, {
                        type: 'RETRIEVE_SUCCESS',
                        category: 'article',
                        id: '7',
                        response: {
                            articleLinks: {
                                fullTextLinks: [],
                                pdfLinks: [],
                                urls: []
                            }
                        }
                    }),
                    {
                        byId: {
                            7: {
                                articleLinks: null
                            }
                        }
                    }
                );
            });
        });
    });


    describe('selector', function () {

        describe('getCurrentPageData', function () {

            it('should return currentPageData', function () {
                assert.deepEqual(fromSearchResult.getCurrentPageData({
                    currentPage: 64,
                    64: [128, 129],
                    65: [130, 131]
                }), [128, 129]);
            });

            it('should return undefined if no currentPage', function () {
                assert.isUndefined(fromSearchResult.getCurrentPageData({
                    currentPage: null,
                    64: 'currentPage',
                    65: 'otherPage'
                }));
            });
        });

        describe('getCurrentPageRecords', function () {

            it('should return record for currentPage', function () {
                assert.deepEqual(fromSearchResult.getCurrentPageRecords({
                    byId: {
                        128: { id: 128 },
                        129: { id: 129 },
                        130: { id: 130 },
                        131: { id: 131 }
                    },
                    currentPage: 64,
                    64: [128, 129],
                    65: [130, 131]
                }), [{ id: 128 }, { id: 129 }]);
            });

            it('should return empty array if no currentPage', function () {
                assert.deepEqual(fromSearchResult.getCurrentPageRecords({
                    currentPage: null,
                    64: 'currentPage',
                    65: 'otherPage'
                }), []);
            });
        });

        describe('getPaginationData', function () {

            it('should return pagination information', function () {
                const paginationData = fromSearchResult.getPaginationData({
                    currentPage: 64,
                    totalHits: 197,
                    maxPage: 65,
                    1: [1, 2, 3],
                    64: [192, 193, 194],
                    65: [195, 196, 197]
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

        describe('getRecordById', function () {
            it('should return recordById', function () {
                assert.deepEqual(fromSearchResult.getRecordById({
                    byId: {
                        1: { id: 1 },
                        2: { id: 2 },
                        3: { id: 3 }
                    }
                }, 2), { id: 2 });
            });
        });
    });
});
