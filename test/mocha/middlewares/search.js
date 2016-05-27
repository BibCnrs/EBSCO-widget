import _ from 'lodash';

import { search, getQueries, getTerms } from '../../../lib/middlewares/search';
import actions, {
    ARTICLE,
    PUBLICATION,
    RELOAD_HISTORY
} from '../../../lib/actions';

describe('search middleware', function () {
    let store, dispatchedAction, next, nextAction;
    const state = {
        url: 'http://apiroute',
        article: {
            search: {
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
            searchResult: {
                currentPage: 5
            },
            facets: {},
            activeFacets: {}
        },
        publication: {
            search: {
                term: 'searched term',
                field: 'TI',
                limiters: {}
            },
            searchResult: {
                currentPage: 3
            },
            facets: {},
            activeFacets: {}
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

    const testArticleType = (type) => {
        const action = {
            type
        };

        search(store, next, action);
        const { from, to } = state.article.search.limiters.publicationDate;
        assert.deepEqual(nextAction, [
            action
        ]);

        assert.deepEqual(dispatchedAction, [
            actions.article.search(
                `${state.url}/${state.domains.article}/article/search?queries=${encodeURIComponent(JSON.stringify(state.article.search.queries))}&FT=Y&DT1=${from}-01/${to}-01&currentPage=5`,
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

    it('should trigger received action and SEARCH action with info gotten from store if it is ARTICLE_SEARCH_TERM', function () {
        testArticleType(ARTICLE.SEARCH_TERM);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is ARTICLE_LIMIT_SEARCH', function () {
        testArticleType(ARTICLE.LIMIT_SEARCH);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is ARTICLE_LIMIT_SEARCH', function () {
        testArticleType(ARTICLE.APPLY_FACET);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is RELOAD_HISTORY', function () {
        testArticleType(RELOAD_HISTORY);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is ARTICLE_LINKED_SEARCH', function () {
        testArticleType(ARTICLE.LINKED_SEARCH);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is ARTICLE_CHANGE_SORT', function () {
        testArticleType(ARTICLE.CHANGE_SORT);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is ARTICLE_PAGE_LOAD', function () {
        testArticleType(ARTICLE.PAGE_LOAD);
    });


    it('should not trigger received action if it is ARTICLE_PAGE_LOAD and the currentPage is in the store', function () {
        store.getState = () => ({
            ...state,
            article: {
                ...state.article,
                searchResult: {
                    currentPage: 5,
                    5: { page: 'data' }
                }
            }
        });
        const action = {
            type: ARTICLE.PAGE_LOAD,
            page: 5
        };

        search(store, next, action);
        assert.deepEqual(nextAction, [action]);
        assert.deepEqual(dispatchedAction, []);
    });

    const testPublicationType = (type) => {
        const action = {
            type
        };

        search(store, next, action);
        assert.deepEqual(nextAction, [
            action
        ]);

        assert.deepEqual(dispatchedAction, [
            actions.publication.search(
                `${state.url}/${state.domains.publication}/publication/search?queries=${encodeURIComponent(JSON.stringify([{
                    term: state.publication.search.term,
                    field: state.publication.search.field
                }]))}&currentPage=3`,
                state.login.token,
                {
                    queries: [{ field: 'TI', term: 'searched term' }],
                    domain: 'shs',
                    activeFacets: undefined,
                    action: undefined,
                    limiters: {}
                }
            )
        ]);
    };

    it('should trigger received action and SEARCH action with info gotten from store if it is PUBLICATION_SEARCH_TERM', function () {
        testPublicationType(PUBLICATION.SEARCH_TERM);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is PUBLICATION_LIMIT_SEARCH', function () {
        testPublicationType(PUBLICATION.LIMIT_SEARCH);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is PUBLICATION_LIMIT_SEARCH', function () {
        testPublicationType(PUBLICATION.APPLY_FACET);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is PUBLICATION_CHANGE_SORT', function () {
        testPublicationType(PUBLICATION.CHANGE_SORT);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is PUBLICATION_PAGE_LOAD', function () {
        testPublicationType(PUBLICATION.PAGE_LOAD);
    });

    it('should not trigger if received action is PUBLICATION_PAGE_LOAD and the currentPage is in the store', function () {
        store.getState = () => ({
            ...state,
            publication: {
                ...state.publication,
                searchResult: {
                    currentPage: 3,
                    3: { page: 'data' }
                }
            }
        });
        const action = {
            type: PUBLICATION.PAGE_LOAD,
            page: 3
        };

        search(store, next, action);
        assert.deepEqual(nextAction, [action]);
        assert.deepEqual(dispatchedAction, []);
    });

    describe('getQueries', function () {

        it('should return state.article.search.queries if type is article', function () {
            const queries = [{ term: 'aids', field: 'TI'}];
            const state = {
                article: {
                    search: {
                        queries
                    }
                }
            };
            assert.deepEqual(getQueries('article', state), queries);
        });

        it('should returnqueries based on state.publication.search.term and state.publication.search.field if type is publication', function () {
            const state = {
                publication: {
                    search: {
                        term: 'aids',
                        field: 'TI'
                    }
                }
            };
            assert.deepEqual(getQueries('publication', state), [{ term: 'aids', field: 'TI'}]);
        });

        it('should return state.a2z.search.term and state.publication.search.field as queries if type is a2z', function () {
            const state = {
                a2z: {
                    search: {
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
