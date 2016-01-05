import { Map } from 'immutable';
import { search } from '../../../lib/middlewares/search';
import actions from '../../../lib/actions';

describe('search middleware', function () {
    let store, dispatchedAction, next, nextAction;
    const state = {
        url: 'http://apiroute',
        search: Map({
            term: 'searched term',
            currentDomain: 'vie',
            limiters: Map({
                fullText: true,
                publicationDate: Map({
                    from: '1000-01',
                    to: '2016-01'
                })
            })
        }),
        login: Map({
            token: 'token'
        }),
        searchResult: Map({
            currentPage: 5
        })
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
        const { from, to } = state.search.get('limiters').get('publicationDate').toJS();
        assert.deepEqual(nextAction, [
            action
        ]);

        assert.deepEqual(dispatchedAction, [actions.search(`${state.url}/search/${state.search.get('currentDomain')}/${state.search.get('term')}?FT=Y&DT1=${from}/${to}&currentPage=5`, state.login.get('token'))]);
    });
});
