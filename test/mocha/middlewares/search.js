import { search } from '../../../lib/middlewares/search';
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
                domain: 'vie',
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
                domain: 'shs',
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
});
