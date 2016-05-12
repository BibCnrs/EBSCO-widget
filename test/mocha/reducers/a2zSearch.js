import a2zSearch, { defaultState } from '../../../lib/reducers/a2zSearch';

import {
    LOGIN,
    API_LOGIN_SUCCESS,
    LOGOUT,
    FETCH_DOMAINS_SUCCESS,
    A2Z
} from '../../../lib/actions';

const {
    SEARCH_TERM,
    DOMAIN_CHANGE,
    SEARCH_PENDING,
    SEARCH_ERROR
} = A2Z;

describe('reducers a2zSearch', function () {

    it('should set queries to Action.queries when action is A2Z_SEARCH_TERM', function () {
        const searchState = a2zSearch(
            { status: 'NONE' },
            { type: SEARCH_TERM, queries: ['queries'] }
        );
        assert.deepEqual(searchState, {
            status: 'NONE',
            queries: ['queries']
        });

    });

    it('should return PENDING if action is ARTICLE_SEARCH_PENDING', function () {
        const searchState = a2zSearch(
            { term: 'my search', status: 'NONE' },
            { type: SEARCH_PENDING }
        );
        assert.deepEqual(searchState, {
            term: 'my search',
            status: 'PENDING'
        });
    });

    it('should return DONE if action is ARTICLE_SEARCH_ERROR', function () {
        const searchState = a2zSearch(
            { status: 'NONE' },
            { type: SEARCH_ERROR, error: { message: 'boom' } }
        );
        assert.deepEqual(searchState, {
            status: 'DONE'
        });
    });

    it('should update domain with action.domain if action is ARTICLE_DOMAIN_CHANGE', function () {
        const state = {
            status: 'state',
            domain: 'vie'
        };
        assert.deepEqual(
            a2zSearch(
                state,
                { type: DOMAIN_CHANGE, domain: 'shs' }
            ),
            {
                status: 'state',
                domain: 'shs'
            }
        );
    });

    it('should return default state except for domain if action is LOGOUT', function () {
        const searchState = a2zSearch(
            { status: 'state', domain: 'vie' },
            { type: LOGOUT }
        );
        assert.deepEqual(searchState, {
            ...defaultState,
            domain: 'vie'
        });
    });

    it('should add first domains to state if action is LOGIN', function () {
        const searchState = a2zSearch(
            { status: 'state' },
            { type: LOGIN, domains: [ 'first', 'second' ] }
        );
        assert.deepEqual(searchState, { status: 'state', domain: 'first'});
    });

    it('should add first domains to state if action is API_LOGIN_SUCCESS', function () {
        const searchState = a2zSearch(
            { status: 'state' },
            { type: API_LOGIN_SUCCESS, response: { domains: [ 'first', 'second' ] } }
        );
        assert.deepEqual(searchState, { status: 'state', domain: 'first'});
    });

    it('should set domain to action.response[0] if action is FETCH_DOMAINS_SUCCESS', function () {
        assert.deepEqual(
            a2zSearch(
                { status: 'state' },
                { type: FETCH_DOMAINS_SUCCESS, response: ['vie', 'shs'] }
            ),
            {
                status: 'state',
                domain: 'vie'
            }
        );
    });
});
