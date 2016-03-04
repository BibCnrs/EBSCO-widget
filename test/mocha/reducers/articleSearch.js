import articleSearch, { defaultState } from '../../../lib/reducers/articleSearch';
import { defaultState as defaultLimiters } from '../../../lib/reducers/articleLimiters';
import { defaultState as defaultQueryList } from '../../../lib/reducers/articleQueryList';

import {
    LOGIN_SUCCESS,
    LOGOUT,
    RELOAD_HISTORY,
    RESTORE_HISTORY,
    SET_AVAILABLE_DOMAINS,
    ARTICLE
} from '../../../lib/actions';

const {
    DOMAIN_CHANGE,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    RESET,
    CHANGE_SORT
} = ARTICLE;

describe('reducers articleSearch', function () {

    it('should return PENDING if action is ARTICLE_SEARCH_PENDING', function () {
        const searchState = articleSearch(
            { term: 'my search', status: 'NONE' },
            { type: SEARCH_PENDING }
        );
        assert.deepEqual(searchState, {
            term: 'my search',
            status: 'PENDING'
        });
    });

    it('should return DONE if action is ARTICLE_SEARCH_SUCCESS', function () {
        const searchState = articleSearch(
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
            activeFacets: []
        });
    });

    it('should return DONE if action is ARTICLE_SEARCH_ERROR', function () {
        const searchState = articleSearch(
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
            articleSearch(
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
                articleSearch(
                state,
                { type: DOMAIN_CHANGE, domain: 'shs' }
            ),
            state
        );
    });

    it('should return default state if action is LOGOUT', function () {
        const searchState = articleSearch(
            { status: 'state' },
            { type: LOGOUT }
        );
        assert.deepEqual(searchState, defaultState);
    });

    it('should add first domains to state if action is LOGIN_SUCCESS', function () {
        const searchState = articleSearch(
            { status: 'state' },
            { type: LOGIN_SUCCESS, response: { domains: [ 'first', 'second' ] } }
        );
        assert.deepEqual(searchState, { status: 'state', availableDomains: ['first', 'second'], domain: 'first'});
    });

    it('should return default queries, sort, limiter and facet if action is ARTICLE_RESET', function () {
        const searchState = articleSearch(
            { status: 'state' },
            { type: RESET, response: { domains: [ 'first', 'second' ] } }
        );
        assert.deepEqual(searchState, {
            status: 'state',
            limiters: defaultLimiters,
            activeFacets: [],
            queries: defaultQueryList,
            sort: 'relevance'
        });
    });

    it('should return action.query if action is RESTORE_HISTORY or RELOAD_HISTORY', function () {
        assert.deepEqual(
            articleSearch(
                { status: 'state' },
                { type: RESTORE_HISTORY, query: 'replace' }
            ),
            'replace'
        );
        assert.deepEqual(
            articleSearch(
                { status: 'state' },
                { type: RELOAD_HISTORY, query: 'replace' }
            ),
            'replace'
        );
    });

    it('should set availableDomains to action.value, and domain to action.value[0] id action is SET_AVAILABLE_DOMAINS', function () {
        assert.deepEqual(
            articleSearch(
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

    it('should return state with sort set as action.value if action is ARTICLE_CHANGE_SORT', function () {
        const searchState = articleSearch(
            { status: 'state' },
            { type: CHANGE_SORT, value: 'date' }
        );
        assert.deepEqual(searchState, { status: 'state', sort: 'date' });
    });

    it('should return passed state with default limiter and defaulQueryList if action is none of the above', function () {
        const searchState = articleSearch(
            { status: 'state' },
            { type: 'OTHER_ACTION_TYPE' }
        );
        assert.deepEqual(searchState, { status: 'state', limiters: defaultLimiters, queries: defaultQueryList, activeFacets: [] });
    });

    it('should default status to NONE and term to "" if none given', function () {
        const searchState = articleSearch(undefined, { type: 'OTHER_ACTION_TYPE' });
        assert.deepEqual(searchState, {
            queries: [{
                boolean: 'AND',
                term: '',
                field: null
            }],
            availableBoolean: [
                'AND',
                'OR',
                'NOT'
            ],
            status: 'NONE',
            domain: null,
            availableDomains: [],
            limiters: defaultLimiters,
            activeFacets: [],
            sort: 'relevance',
            availableSort: [
                {
                    label: 'pertinence',
                    value: 'relevance'
                }, {
                    label: `date (récent - ancien)`,
                    value: 'date'
                }, {
                    label: `date (ancien - récent)`,
                    value: 'date2'
                }
            ],
            availableFields: [
                {
                    label: 'Tout',
                    value: null
                }, {
                    label: `Auteur`,
                    value: 'AU'
                }, {
                    label: `Titre`,
                    value: 'TI'
                }, {
                    label: `Sujet`,
                    value: 'SU'
                }, {
                    label: `Source`,
                    value: 'S0'
                }, {
                    label: `Résumé`,
                    value: 'AB'
                }, {
                    label: `ISSN`,
                    value: 'IS'
                }, {
                    label: `ISBN`,
                    value: 'IB'
                }
            ]
        });
    });
});
