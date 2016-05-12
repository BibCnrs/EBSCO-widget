import publicationSearch, { defaultState } from '../../../lib/reducers/publicationSearch';
import { defaultState as defaultLimiters } from '../../../lib/reducers/publicationLimiters';
import { defaultState as defaultActiveFacets } from '../../../lib/reducers/publicationActiveFacets';
import {
    LOGIN,
    API_LOGIN_SUCCESS,
    LOGOUT,
    FETCH_DOMAINS_SUCCESS,
    PUBLICATION
} from '../../../lib/actions';

const {
    CHANGE_TERM,
    DOMAIN_CHANGE,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    CHANGE_SORT,
    CHANGE_FIELD
} = PUBLICATION;

describe('reducers publicationSearch', function () {

    it('should return PENDING if action is PUBLICATION_SEARCH_PENDING', function () {
        const searchState = publicationSearch(
            { term: 'my search', status: 'NONE' },
            { type: SEARCH_PENDING }
        );
        assert.deepEqual(searchState, {
            term: 'my search',
            status: 'PENDING'
        });
    });

    it('should return DONE and set activeFacets if action is PUBLICATION_SEARCH_SUCCESS', function () {
        const searchState = publicationSearch(
            { status: 'NONE', term: 'aids', activeFacets: [] },
            {
                type: SEARCH_SUCCESS,
                response: {
                    activeFacets: {
                        Language: ['french']
                    }
                }
            }
        );
        assert.deepEqual(searchState, {
            status: 'DONE',
            term: 'aids',
            activeFacets: {
                Language: ['french']
            }
        });
    });

    it('should return DONE if action is PUBLICATION_SEARCH_ERROR', function () {
        const searchState = publicationSearch(
            { status: 'NONE' },
            { type: SEARCH_ERROR, error: { message: 'boom' } }
        );
        assert.deepEqual(searchState, {
            status: 'DONE'
        });
    });

    it('should update term with action.term if action is PUBLICATION_CHANGE_TERM', function () {
        const searchState = publicationSearch(
            { status: 'state' },
            { type: CHANGE_TERM, term: 'searched term' }
        );
        assert.deepEqual(searchState, { status: 'state', term: 'searched term' });
    });

    it('should update domain with action.domain if action is PUBLICATION_DOMAIN_CHANGE', function () {
        const state = {
            status: 'state',
            availableDomains: ['vie', 'shs'],
            domain: 'vie'
        };
        assert.deepEqual(
            publicationSearch(
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

    it('should return default state except forn domain if action is LOGOUT', function () {
        const searchState = publicationSearch(
            { status: 'state', domain: 'vie' },
            { type: LOGOUT }
        );
        assert.deepEqual(searchState, {
            ...defaultState,
            domain: 'vie'
        });
    });

    it('should add first domains to state if action is LOGIN_SUCCESS', function () {
        const searchState = publicationSearch(
            { status: 'state' },
            { type: LOGIN, domains: [ 'first', 'second' ] }
        );
        assert.deepEqual(searchState, { status: 'state', domain: 'first'});
    });

    it('should add first domains to state if action is API_LOGIN_SUCCESS', function () {
        const searchState = publicationSearch(
            { status: 'state' },
            { type: API_LOGIN_SUCCESS, response: { domains: [ 'first', 'second' ] } }
        );
        assert.deepEqual(searchState, { status: 'state', domain: 'first'});
    });

    it('should set domain to action.response[0] if action is FETCH_DOMAINS_SUCCESS', function () {
        assert.deepEqual(
            publicationSearch(
                { status: 'state' },
                { type: FETCH_DOMAINS_SUCCESS, response: ['vie', 'shs'] }
            ),
            {
                status: 'state',
                domain: 'vie'
            }
        );
    });

    it('should return state with sort set as action.value if action is PUBLICATION_CHANGE_SORT', function () {
        const searchState = publicationSearch(
            { status: 'state' },
            { type: CHANGE_SORT, value: 'date' }
        );
        assert.deepEqual(searchState, { status: 'state', sort: 'date' });
    });

    it('should return passed state with default limiter if action is none of the above', function () {
        const searchState = publicationSearch(
            { status: 'state' },
            { type: 'OTHER_ACTION_TYPE' }
        );
        assert.deepEqual(searchState, { status: 'state', limiters: defaultLimiters, activeFacets: defaultActiveFacets });
    });

    it('should set field to action.value if type is PUBLICATION_CHANGE_FIELD', function () {
        assert.deepEqual(
            publicationSearch(
                { status: 'state', field: 'TI' },
                { type: CHANGE_FIELD, value: 'AU' }
            ),
            { status: 'state', field: 'AU' }
        );
    });

    it('should default status to NONE and term to ""', function () {
        const searchState = publicationSearch(undefined, { type: 'OTHER_ACTION_TYPE' });
        assert.deepEqual(searchState, {
            term: '',
            field: null,
            status: 'NONE',
            domain: null,
            limiters: defaultLimiters,
            activeFacets: defaultActiveFacets,
            sort: 'relevance'
        });
    });
});
