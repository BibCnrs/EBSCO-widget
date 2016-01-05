import { Map } from 'immutable';
import getSearch, { getDefaultState } from '../../../lib/reducers/search';
import { defaultState as defaultLimiters } from '../../../lib/reducers/limiters';
import { SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_ERROR, TERM_CHANGE, DOMAIN_CHANGE, LOGOUT } from '../../../lib/actions';

describe('reducers search', function () {
    let search;
    before(function () {
        search = getSearch();
    });

    describe('getDefaultState', function () {

        it ('should return default state', function () {
            window.sessionStorage = {
                getItem: () => null
            };
            const defaultState = getDefaultState().toJS();
            assert.deepEqual(defaultState, {
                currentDomain: '',
                domains: [],
                status: 'NONE',
                term: '',
                limiters: defaultLimiters.toJS()
            });
        });

        it('should use term if given', function () {
            window.sessionStorage = {
                getItem: () => null
            };
            const defaultState = getDefaultState('term').toJS();
            assert.deepEqual(defaultState, {
                currentDomain: '',
                domains: [],
                status: 'NONE',
                term: 'term',
                limiters: defaultLimiters.toJS()
            });
        });

        it ('should use sessionStorage for domains if set and first domain as currentDomain', function () {
            window.sessionStorage = {
                getItem: (name) => name === 'domains' ? '["list", "of", "domains"]' : null
            };
            const defaultState = getDefaultState().toJS();
            assert.deepEqual(defaultState, {
                currentDomain: 'list',
                domains: ['list', 'of', 'domains'],
                status: 'NONE',
                term: '',
                limiters: defaultLimiters.toJS()
            });
        });

        it ('should use currentDomain, if given and present in domains', function () {
            window.sessionStorage = {
                getItem: (name) => name === 'domains' ? '["list", "of", "domains", "currentDomain"]' : null
            };
            const defaultState = getDefaultState(null, 'currentDomain').toJS();
            assert.deepEqual(defaultState, {
                currentDomain: 'currentDomain',
                domains: ['list', 'of', 'domains', 'currentDomain'],
                status: 'NONE',
                term: '',
                limiters: defaultLimiters.toJS()
            });
        });

        it ('should ignore currentDomain, if given but not present in domains', function () {
            window.sessionStorage = {
                getItem: (name) => name === 'domains' ? '["list", "of", "domains"]' : null
            };
            const defaultState = getDefaultState(null, 'currentDomain').toJS();
            assert.deepEqual(defaultState, {
                currentDomain: 'list',
                domains: ['list', 'of', 'domains'],
                status: 'NONE',
                term: '',
                limiters: defaultLimiters.toJS()
            });
        });

    });

    it('should return PENDING if action is SEARCH_PENDING', function () {
        const searchState = search(
            Map({ term: 'my search', status: 'NONE' }),
            { type: SEARCH_PENDING }
        ).toJS();
        assert.deepEqual(searchState, { term: 'my search', status: 'PENDING' });
    });

    it('should return SUCCESS if action is SEARCH_SUCCESS', function () {
        const searchState = search(
            Map({ status: 'NONE', term: 'aids' }),
            { type: SEARCH_SUCCESS }
        ).toJS();
        assert.deepEqual(searchState, {
            status: 'SUCCESS',
            term: 'aids',
            searchedTerm: 'aids'
        });
    });

    it('should return ERROR and error message if action is SEARCH_ERROR', function () {
        const searchState = search(
            Map({ status: 'NONE' }),
            { type: SEARCH_ERROR, error: { message: 'boom' } }
        ).toJS();
        assert.deepEqual(searchState, {
            status: 'ERROR',
            error: 'boom'
        });
    });

    it('should update term with action.term if action is TERM_CHANGE', function () {
        const searchState = search(
            Map({ status: 'state' }),
            { type: TERM_CHANGE, term: 'searched term' }
        ).toJS();
        assert.deepEqual(searchState, { status: 'state', term: 'searched term' });
    });

    it('should update domain with action.domain if action is DOMAIN_CHANGE', function () {
        const searchState = search(
            Map({ status: 'state' }),
            { type: DOMAIN_CHANGE, domain: 'test' }
        ).toJS();
        assert.deepEqual(searchState, { status: 'state', currentDomain: 'test' });
    });

    it('should return default state if action is LOGOUT', function () {
        window.sessionStorage = {
            getItem: () => null
        };
        const searchState = search(
            Map({ status: 'state' }),
            { type: LOGOUT }
        ).toJS();
        assert.deepEqual(searchState, getDefaultState().toJS());
        delete window.sessionStorage;
    });

    it('should return passed state with default limiter if action is none of the above', function () {
        const searchState = search(
            Map({ status: 'state' }),
            { type: 'OTHER_ACTION_TYPE' }
        );
        assert.deepEqual(searchState.toJS(), { status: 'state', limiters: defaultLimiters.toJS() });
    });

    it('should default status to NONE and term to "" if none given', function () {
        window.sessionStorage = {
            getItem: () => null
        };
        const searchState = search(undefined, { type: 'OTHER_ACTION_TYPE' }).toJS();
        assert.deepEqual(searchState, {
            term: '',
            status: 'NONE',
            currentDomain: '',
            domains: [],
            limiters: defaultLimiters.toJS()
        });
        delete window.sessionStorage;
    });

    it('default term and domain to passed term and domain', function () {
        window.sessionStorage = {
            getItem: (name) => name === 'domains' ? '["test"]' : null
        };
        search = getSearch('geronimo', 'test');
        assert.deepEqual(
            search(undefined, { type: 'OTHER_ACTION_TYPE' }).toJS(),
            { term: 'geronimo', currentDomain: 'test', status: 'NONE', domains: ['test'], limiters: defaultLimiters.toJS() });
    });
});
