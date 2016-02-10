import getSearch, { getDefaultState } from '../../../lib/reducers/search';
import { defaultState as defaultLimiters } from '../../../lib/reducers/limiters';
import {
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    TERM_CHANGE,
    DOMAIN_CHANGE,
    LOGOUT,
    LOGIN_SUCCESS,
    RESTORE_HISTORY,
    RELOAD_HISTORY,
    RESET
} from '../../../lib/actions';

describe('reducers search', function () {
    let search;
    before(function () {
        search = getSearch();
    });

    describe('getDefaultState', function () {

        it('should return default state', function () {
            window.sessionStorage = {
                getItem: () => null
            };
            const defaultState = getDefaultState();
            assert.deepEqual(defaultState, {
                domain: undefined,
                status: 'NONE',
                term: '',
                limiters: defaultLimiters,
                activeFacets: []
            });
        });

        it('should use term if given', function () {
            window.sessionStorage = {
                getItem: () => null
            };
            const defaultState = getDefaultState('term');
            assert.deepEqual(defaultState, {
                domain: undefined,
                status: 'NONE',
                term: 'term',
                limiters: defaultLimiters,
                activeFacets: []
            });
        });

        it('should use domain, if given and present in domains', function () {
            window.sessionStorage = {
                getItem: (name) => name === 'domains' ? '["list", "of", "domains", "domain"]' : null
            };
            const defaultState = getDefaultState(null, 'domain');
            assert.deepEqual(defaultState, {
                domain: 'domain',
                status: 'NONE',
                term: '',
                limiters: defaultLimiters,
                activeFacets: []
            });
        });

    });

    it('should return PENDING if action is SEARCH_PENDING', function () {
        const searchState = search(
            { term: 'my search', status: 'NONE' },
            { type: SEARCH_PENDING }
        );
        assert.deepEqual(searchState, {
            term: 'my search',
            status: 'PENDING',
            searchedTerm: undefined
        });
    });

    it('should return DONE if action is SEARCH_SUCCESS', function () {
        const searchState = search(
            { status: 'NONE', term: 'aids', activeFacets: [] },
            {
                type: SEARCH_SUCCESS,
                response: {
                    facets: [],
                    activeFacets: []
                }
            }
        );
        assert.deepEqual(searchState, {
            status: 'DONE',
            term: 'aids',
            searchedTerm: 'aids',
            activeFacets: []
        });
    });

    it('should return DONE if action is SEARCH_ERROR', function () {
        const searchState = search(
            { status: 'NONE' },
            { type: SEARCH_ERROR, error: { message: 'boom' } }
        );
        assert.deepEqual(searchState, {
            status: 'DONE'
        });
    });

    it('should update term with action.term if action is TERM_CHANGE', function () {
        const searchState = search(
            { status: 'state' },
            { type: TERM_CHANGE, term: 'searched term' }
        );
        assert.deepEqual(searchState, { status: 'state', term: 'searched term' });
    });

    it('should update domain with action.domain if action is DOMAIN_CHANGE', function () {
        const searchState = search(
            { status: 'state' },
            { type: DOMAIN_CHANGE, domain: 'test' }
        );
        assert.deepEqual(searchState, {
            status: 'state',
            domain: 'test',
            searchedTerm: undefined
        });
    });

    it('should return default state if action is LOGOUT', function () {
        window.sessionStorage = {
            getItem: () => null
        };
        const searchState = search(
            { status: 'state' },
            { type: LOGOUT }
        );
        assert.deepEqual(searchState, getDefaultState());
        delete window.sessionStorage;
    });

    it('should add first domains to state if action is LOGIN_SUCCESS', function () {
        const searchState = search(
            { status: 'state' },
            { type: LOGIN_SUCCESS, response: { domains: [ 'first', 'second' ] } }
        );
        assert.deepEqual(searchState, { status: 'state', domain: 'first'});
    });

    it('should set searchedTerm to undefined and return default limiter and facet if action is RESET', function () {
        const searchState = search(
            { status: 'state' },
            { type: RESET, response: { domains: [ 'first', 'second' ] } }
        );
        assert.deepEqual(searchState, {
            status: 'state',
            limiters: defaultLimiters,
            activeFacets: [],
            searchedTerm: undefined
        });
    });

    it('should return action.query if action is RESTORE_HISTORY or RELOAD_HISTORY', function () {
        assert.deepEqual(
            search(
                { status: 'state' },
                { type: RESTORE_HISTORY, query: 'replace' }
            ),
            'replace'
        );
        assert.deepEqual(
            search(
                { status: 'state' },
                { type: RELOAD_HISTORY, query: 'replace' }
            ),
            'replace'
        );
    });

    it('should return passed state with default limiter if action is none of the above', function () {
        const searchState = search(
            { status: 'state' },
            { type: 'OTHER_ACTION_TYPE' }
        );
        assert.deepEqual(searchState, { status: 'state', limiters: defaultLimiters, activeFacets: [] });
    });

    it('should default status to NONE and term to "" if none given', function () {
        window.sessionStorage = {
            getItem: () => null
        };
        const searchState = search(undefined, { type: 'OTHER_ACTION_TYPE' });
        assert.deepEqual(searchState, {
            term: '',
            status: 'NONE',
            domain: undefined,
            limiters: defaultLimiters,
            activeFacets: []
        });
        delete window.sessionStorage;
    });

    it('default term and domain to passed term and domain', function () {
        window.sessionStorage = {
            getItem: (name) => name === 'domains' ? '["test"]' : null
        };
        search = getSearch('geronimo', 'test');
        assert.deepEqual(
            search(undefined, { type: 'OTHER_ACTION_TYPE' }),
            {
                term: 'geronimo',
                domain: 'test',
                status: 'NONE',
                limiters: defaultLimiters,
                activeFacets: []
            }
        );
        delete window.sessionStorage;
    });
});
