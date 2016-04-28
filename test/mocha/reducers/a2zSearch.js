import a2zSearch, { defaultState } from '../../../lib/reducers/a2zSearch';

import {
    LOGIN,
    LOGOUT,
    SET_AVAILABLE_DOMAINS,
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
            availableDomains: ['vie', 'shs'],
            domain: 'vie'
        };
        assert.deepEqual(
            a2zSearch(
                state,
                { type: DOMAIN_CHANGE, domain: 'shs' }
            ),
            {
                status: 'state',
                availableDomains: ['vie', 'shs'],
                domain: 'shs'
            }
        );
    });

    it('should not update domain with action.domain if domain is not in state.availableDomains if action is ARTICLE_DOMAIN_CHANGE', function () {
        const state = { status: 'state', domain: 'vie', availableDomains: [] };
        assert.deepEqual(
                a2zSearch(
                state,
                { type: DOMAIN_CHANGE, domain: 'shs' }
            ),
            state
        );
    });

    it('should return default state if action is LOGOUT', function () {
        const searchState = a2zSearch(
            { status: 'state' },
            { type: LOGOUT }
        );
        assert.deepEqual(searchState, defaultState);
    });

    it('should add first domains to state if action is LOGIN_SUCCESS', function () {
        const searchState = a2zSearch(
            { status: 'state' },
            { type: LOGIN, domains: [ 'first', 'second' ] }
        );
        assert.deepEqual(searchState, { status: 'state', availableDomains: ['first', 'second'], domain: 'first'});
    });

    it('should set availableDomains to action.value, and domain to action.value[0] id action is SET_AVAILABLE_DOMAINS', function () {
        assert.deepEqual(
            a2zSearch(
                { status: 'state' },
                { type: SET_AVAILABLE_DOMAINS, value: ['vie', 'shs'] }
            ),
            {
                status: 'state',
                domain: 'vie',
                availableDomains: ['vie', 'shs']
            }
        );
    });
});
