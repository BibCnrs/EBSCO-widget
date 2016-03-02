import getSearch, { getDefaultState } from '../../../lib/reducers/articleSearch';
import { defaultState as defaultLimiters } from '../../../lib/reducers/articleLimiters';
import {
    ARTICLE,
    LOGOUT,
    LOGIN_SUCCESS,
    RESTORE_HISTORY,
    RELOAD_HISTORY
} from '../../../lib/actions';

const {
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    CHANGE_TERM,
    DOMAIN_CHANGE,
    RESET,
    CHANGE_SORT
} = ARTICLE;

describe('reducers articleSearch', function () {
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
                field: null,
                limiters: defaultLimiters,
                activeFacets: [],
                sort: 'relevance',
                availableSort: [
                    {
                        label: 'pertinence',
                        value: 'relevance'
                    }, {
                        label: `date de publication décroissante`,
                        value: 'date'
                    }, {
                        label: `date de publication croissante`,
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

        it('should use term if given', function () {
            window.sessionStorage = {
                getItem: () => null
            };
            const defaultState = getDefaultState('term');
            assert.deepEqual(defaultState, {
                domain: undefined,
                status: 'NONE',
                term: 'term',
                field: null,
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
                ],
                limiters: defaultLimiters,
                activeFacets: [],
                sort: 'relevance',
                availableSort: [
                    {
                        label: 'pertinence',
                        value: 'relevance'
                    }, {
                        label: `date de publication décroissante`,
                        value: 'date'
                    }, {
                        label: `date de publication croissante`,
                        value: 'date2'
                    }
                ]
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
                field: null,
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
                ],
                limiters: defaultLimiters,
                activeFacets: [],
                sort: 'relevance',
                availableSort: [
                    {
                        label: 'pertinence',
                        value: 'relevance'
                    }, {
                        label: `date de publication décroissante`,
                        value: 'date'
                    }, {
                        label: `date de publication croissante`,
                        value: 'date2'
                    }
                ]
            });
        });

    });

    it('should return PENDING if action is ARTICLE_SEARCH_PENDING', function () {
        const searchState = search(
            { term: 'my search', status: 'NONE' },
            { type: SEARCH_PENDING }
        );
        assert.deepEqual(searchState, {
            term: 'my search',
            status: 'PENDING'
        });
    });

    it('should return DONE if action is ARTICLE_SEARCH_SUCCESS', function () {
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
            activeFacets: []
        });
    });

    it('should return DONE if action is ARTICLE_SEARCH_ERROR', function () {
        const searchState = search(
            { status: 'NONE' },
            { type: SEARCH_ERROR, error: { message: 'boom' } }
        );
        assert.deepEqual(searchState, {
            status: 'DONE'
        });
    });

    it('should update term with action.term if action is ARTICLE_CHANGE_TERM', function () {
        const searchState = search(
            { status: 'state' },
            { type: CHANGE_TERM, term: 'searched term' }
        );
        assert.deepEqual(searchState, { status: 'state', term: 'searched term' });
    });

    it('should update domain with action.domain if action is ARTICLE_DOMAIN_CHANGE', function () {
        const searchState = search(
            { status: 'state' },
            { type: DOMAIN_CHANGE, domain: 'test' }
        );
        assert.deepEqual(searchState, {
            status: 'state',
            domain: 'test'
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

    it('should return default sort, limiter and facet if action is ARTICLE_RESET', function () {
        const searchState = search(
            { status: 'state' },
            { type: RESET, response: { domains: [ 'first', 'second' ] } }
        );
        assert.deepEqual(searchState, {
            status: 'state',
            limiters: defaultLimiters,
            activeFacets: [],
            sort: 'relevance'
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

    it('should return state with sort set as action.value if action is ARTICLE_CHANGE_SORT', function () {
        const searchState = search(
            { status: 'state' },
            { type: CHANGE_SORT, value: 'date' }
        );
        assert.deepEqual(searchState, { status: 'state', sort: 'date' });
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
            field: null,
            status: 'NONE',
            domain: undefined,
            limiters: defaultLimiters,
            activeFacets: [],
            sort: 'relevance',
            availableSort: [
                {
                    label: 'pertinence',
                    value: 'relevance'
                }, {
                    label: `date de publication décroissante`,
                    value: 'date'
                }, {
                    label: `date de publication croissante`,
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
                field: null,
                domain: 'test',
                status: 'NONE',
                limiters: defaultLimiters,
                activeFacets: [],
                sort: 'relevance',
                availableSort: [
                    {
                        label: 'pertinence',
                        value: 'relevance'
                    }, {
                        label: `date de publication décroissante`,
                        value: 'date'
                    }, {
                        label: `date de publication croissante`,
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
            }
        );
        delete window.sessionStorage;
    });
});