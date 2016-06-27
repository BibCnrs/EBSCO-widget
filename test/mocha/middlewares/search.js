import _ from 'lodash';

import { search, getQueries, getTerms } from '../../../lib/middlewares/search';
import actions, {
    PAGE_LOAD,
    SEARCH_TERM,
    SEARCH_LETTERS,
    LIMIT_SEARCH,
    APPLY_FACET,
    CHANGE_RESULTS_PER_PAGE,
    RELOAD_HISTORY,
    CHANGE_SORT,
    LINKED_SEARCH
} from '../../../lib/actions';

describe('search middleware', function () {
    let store, dispatchedAction, next, nextAction;
    const state = {
        url: 'http://apiroute',
        search: {
            article: {
                queries: [{
                    term: 'searched term',
                    field: 'TI'
                }],
                limiters: {
                    fullText: true,
                    publicationDate: {
                        from: 1000,
                        to: 2016
                    }
                }
            },
            publication: {
                term: 'searched term',
                field: 'TI',
                limiters: {}
            }
        },
        searchResult: {
            article: {
                currentPage: 5
            },
            publication: {
                currentPage: 3
            }
        },
        login: {
            token: 'token'
        },
        domains: {
            all: ['vie, shs'],
            available: ['vie, shs'],
            article: 'vie',
            publication: 'shs',
            a2z: 'vie'
        }
    };

    beforeEach(function () {
        dispatchedAction = [];
        store = {
            getState: function () {
                return state;
            },
            dispatch: function (action) {
                dispatchedAction.push(action);
            }
        };
        nextAction = [];
        next = function (action) {
            nextAction.push(action);
        };
    });

    it('should only trigger received action if it is not one of ARTICLE_PAGE_LOAD, ARTICLE_SEARCH_TERM, ARTICLE_LIMIT_SEARCH, ARTICLE_APPLY_FACET, PUBLICATION_PAGE_LOAD, PUBLICATION_SEARCH_TERM, PUBLICATION_LIMIT_SEARCH, PUBLICATION_APPLY_FACET', function () {
        const action = {
            type: 'DONT_CARE'
        };

        search(store, next, action);
        assert.deepEqual(nextAction, [action]);
        assert.deepEqual(dispatchedAction, []);
    });

    const testType = (type) => {
        const action = {
            type,
            category: 'article'
        };

        search(store, next, action);
        const { from, to } = state.search.article.limiters.publicationDate;
        assert.deepEqual(nextAction, [
            action
        ]);

        assert.deepEqual(dispatchedAction, [
            actions.search(
                'article',
                `${state.url}/${state.domains.article}/article/search?queries=${encodeURIComponent(JSON.stringify(state.search.article.queries))}&FT=Y&DT1=${from}-01/${to}-01&currentPage=5`,
                state.login.token,
                {
                    queries: [{ field: 'TI', term: 'searched term' }],
                    domain: 'vie',
                    activeFacets: undefined,
                    action: undefined,
                    limiters: {
                        fullText: true,
                        publicationDate: {
                            from: 1000,
                            to: 2016
                        }
                    }
                }
            )
        ]);
    };

    it('should trigger received action and SEARCH action with info gotten from store if it is SEARCH_TERM', function () {
        testType(SEARCH_TERM);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is LIMIT_SEARCH', function () {
        testType(LIMIT_SEARCH);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is LIMIT_SEARCH', function () {
        testType(APPLY_FACET);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is RELOAD_HISTORY', function () {
        testType(RELOAD_HISTORY);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is LINKED_SEARCH', function () {
        testType(LINKED_SEARCH);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is CHANGE_SORT', function () {
        testType(CHANGE_SORT);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is PAGE_LOAD', function () {
        testType(PAGE_LOAD);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is CHANGE_RESULTS_PER_PAGE', function () {
        testType(CHANGE_RESULTS_PER_PAGE);
    });


    it('should trigger received action and SEARCH action with info gotten from store if it is CHANGE_RESULTS_PER_PAGE', function () {
        testType(SEARCH_LETTERS);
    });


    it('should not trigger received action if it is PAGE_LOAD and the currentPage is in the store', function () {
        store.getState = () => ({
            ...state,
            searchResult: {
                ...state.searchResult,
                article: {
                    currentPage: 5,
                    5: { page: 'data' }
                }
            }
        });
        const action = {
            type: PAGE_LOAD,
            category: 'article',
            page: 5
        };

        search(store, next, action);
        assert.deepEqual(nextAction, [action]);
        assert.deepEqual(dispatchedAction, []);
    });

    describe('getQueries', function () {

        it('should return state.search.article.queries if type is article', function () {
            const queries = [{ term: 'aids', field: 'TI'}];
            const state = {
                search: {
                    article: {
                        queries
                    }
                }
            };
            assert.deepEqual(getQueries('article', state), queries);
        });

        it('should returnqueries based on state.search.publication.term and state.publication.search.field if type is publication', function () {
            const state = {
                search: {
                    publication: {
                        term: 'aids',
                        field: 'TI'
                    }
                }
            };
            assert.deepEqual(getQueries('publication', state), [{ term: 'aids', field: 'TI'}]);
        });

        it('should return state.search.a2z.term and state.publication.search.field as queries if type is a2z', function () {
            const state = {
                search: {
                    a2z: {
                        firstLetter: 'A',
                        secondLetter: 'B',
                        field: 'JN'
                    }
                }
            };
            assert.deepEqual(getQueries('a2z', state), [{ term: 'AB*', field: 'JN', boolean: 'OR' }]);
        });

    });

    describe('getTerms', function () {
        it('should compute term based on firstLeter and second letter', function () {
            assert.deepEqual(getTerms('A', 'B'), ['AB*']);
        });

        it('should return "" if no firstLetter', function () {
            assert.deepEqual(getTerms('', 'B'), ['']);
        });

        it('should ignore secondLetter if there is none', function () {
            assert.deepEqual(getTerms('A', ''), ['A*']);
        });

        it('should return all digit if first letter is #', function () {
            assert.deepEqual(getTerms('#', ''), _.range(10).map(i => `${i}*`));
        });

        it('should return all digit if secondLetter letter is #', function () {
            assert.deepEqual(getTerms('B', '#'), _.range(10).map(i => `B${i}*`));
        });

        it('should return all digit combination if first and second letter are #', function () {
            assert.deepEqual(getTerms('#', '#'), _.range(100).map(i => `${i < 10 ? `0${i}` : i}*`));
        });
    });
});
