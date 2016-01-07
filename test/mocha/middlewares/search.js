import { search } from '../../../lib/middlewares/search';
import actions from '../../../lib/actions';

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
                },
                hasChanged: true,
                limiterShown: true,
                moreShown: true
            }
        },
        login: {
            token: 'token'
        },
        searchResult: {
            currentPage: 5
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

    it('should only trigger received action if it is not one of CHANGE_FULLTEXT SEARCH_TERM LIMIT_PUBLICATION_DATE', function () {
        const action = {
            type: 'DONT_CARE'
        };

        search(store, next, action);
        assert.deepEqual(nextAction, [action]);
        assert.deepEqual(dispatchedAction, []);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is one of CHANGE_FULLTEXT SEARCH_TERM LIMIT_PUBLICATION_DATE', function () {
        const action = {
            type: 'SEARCH_TERM'
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
                { term: 'searched term', domain: 'vie', limiters: {
                    fullText: true,
                    publicationDate: {
                        from: '1000-01',
                        to: '2016-01'
                    },
                    hasChanged: undefined,
                    limiterShown: undefined,
                    moreShown: undefined
                } }
            )
        ]);
    });
});
