'use strict';

import { Map } from 'immutable';
import { search } from '../../../lib/middlewares/search';
import actions from '../../../lib/actions';

describe('search middleware', function () {
    let store, dispatchedAction, next, nextAction;
    const state = {
        url: 'http://apiroute',
        limiters: Map({
            fullText: true,
            publicationDate: Map({
                from: '1000-01',
                to: '2016-01'
            })
        }),
        search: Map({
            term: 'searched term'
        }),
        login: Map({
            token: 'token'
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

    it('should only trigger received action if it is not one of FULLTEXT_CHANGE SEARCH_TERM LIMIT_PUBLICATION_DATE', function () {
        const action = {
            type: 'DONT_CARE'
        };

        search(store, next, action);
        assert.deepEqual(nextAction, [action]);
        assert.deepEqual(dispatchedAction, []);
    });

    it('should trigger received action and SEARCH action with info gotten from store if it is one of FULLTEXT_CHANGE SEARCH_TERM LIMIT_PUBLICATION_DATE', function () {
        const action = {
            type: 'SEARCH_TERM'
        };

        search(store, next, action);
        const { from, to } = state.limiters.get('publicationDate').toJS();
        assert.deepEqual(nextAction, [
            action
        ]);

        assert.deepEqual(dispatchedAction, [actions.search(`${state.url}/search/${state.search.get('term')}?FT=Y&DT1=${from}/${to}`, state.login.get('token'))]);
    });
});
