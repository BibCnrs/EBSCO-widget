import { search } from '../../../lib/middlewares/search';
import actions, {
    SEARCH_TERM,
    LIMIT_SEARCH,
    RESET,
    RELOAD_HISTORY,
    PAGE_LOAD
} from '../../../lib/actions';

describe('search middleware', function () {
    let store, dispatchedAction, next, nextAction;
    const state = {
        url: 'http://apiroute',
        search: {
            term: 'searched term',
            domain: 'vie',
            limiters: {
                fullText: true,
                publicationDate: {
                    from: '1000-01',
                    to: '2016-01'
                }
            }
        },
        login: {
            token: 'token'
        },
        searchResult: {
            currentPage: 5
        },
        facets: {},
        activeFacets: {}
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

    it('should only trigger received action if it is not one of CHANGE_FULLTEXT SEARCH_TERM LIMIT_PUBLICATION_DATE', function () {
        const action = {
            type: 'DONT_CARE'
        };

        search(store, next, action);
        assert.deepEqual(nextAction, [action]);
        assert.deepEqual(dispatchedAction, []);
    });

    const testType = (type) => {
        const action = {
            type
        };

        search(store, next, action);
        const { from, to } = state.search.limiters.publicationDate;
        assert.deepEqual(nextAction, [
            action
        ]);

        assert.deepEqual(dispatchedAction, [
            actions.search(
                `${state.url}/search/${state.search.domain}/${state.search.term}?FT=Y&DT1=${from}/${to}&currentPage=5`,
                state.login.token,
                {
                    term: 'searched term',
                    domain: 'vie',
                    activeFacets: undefined,
                    action: undefined,
                    limiters: {
                        fullText: true,
                        publicationDate: {
                            from: '1000-01',
                            to: '2016-01'
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

    it('should trigger received action and SEARCH action with info gotten from store if it is RESET', function () {
        testType(RESET);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is RELOAD_HISTORY', function () {
        testType(RELOAD_HISTORY);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is PAGE_LOAD', function () {
        testType(PAGE_LOAD);
    });

    it('should trigger only received action if it is PAGE_LOAD and the currentPage is in the store', function () {
        store.getState = () => ({
            ...state,
            searchResult: {
                currentPage: 5,
                5: { page: 'data' }
            }
        });
        const action = {
            type: PAGE_LOAD,
            page: 5
        };

        search(store, next, action);
        assert.deepEqual(nextAction, [action]);
        assert.deepEqual(dispatchedAction, []);
    });
});
