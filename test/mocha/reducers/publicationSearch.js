import publicationSearch, { getDefaultState } from '../../../lib/reducers/publicationSearch';
import { defaultState as defaultLimiters } from '../../../lib/reducers/publicationLimiters';
import {
    PUBLICATION,
    LOGOUT,
    LOGIN_SUCCESS
} from '../../../lib/actions';

const {
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    CHANGE_TERM,
    DOMAIN_CHANGE,
    RESET,
    CHANGE_SORT
} = PUBLICATION;

describe('reducers publicationSearch', function () {

    describe('getDefaultState', function () {

        it('should return default state', function () {
            window.sessionStorage = {
                getItem: () => null
            };
            const defaultState = getDefaultState();
            assert.deepEqual(defaultState, {
                domain: undefined,
                status: 'NONE',
                queries: [{
                    term: '',
                    field: null
                }],
                limiters: defaultLimiters,
                activeFacets: [],
                sort: 'relevance',
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
                        label: `ISSN`,
                        value: 'IS'
                    }, {
                        label: `ISBN`,
                        value: 'IB'
                    }, {
                        label: `Resource`,
                        value: 'PT'
                    }, {
                        label: `Editeur`,
                        value: 'PB'
                    }
                ],
                availableSort: [
                    {
                        label: 'pertinence',
                        value: 'relevance'
                    }, {
                        label: 'titre (A à Z)',
                        value: 'title'
                    }, {
                        label: `date (récent - ancien)`,
                        value: 'date'
                    }, {
                        label: `date (ancien - récent)`,
                        value: 'date2'
                    }
                ]
            });
        });

        it('should use first domain of sessionStorage, if given and present in domains', function () {
            window.sessionStorage = {
                getItem: (name) => name === 'domains' ? '["list", "of", "domains", "domain"]' : null
            };
            const defaultState = getDefaultState();
            assert.deepEqual(defaultState, {
                domain: 'list',
                status: 'NONE',
                queries: [{
                    term: '',
                    field: null
                }],
                limiters: defaultLimiters,
                activeFacets: [],
                sort: 'relevance',
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
                        label: `ISSN`,
                        value: 'IS'
                    }, {
                        label: `ISBN`,
                        value: 'IB'
                    }, {
                        label: `Resource`,
                        value: 'PT'
                    }, {
                        label: `Editeur`,
                        value: 'PB'
                    }
                ],
                availableSort: [
                    {
                        label: 'pertinence',
                        value: 'relevance'
                    }, {
                        label: 'titre (A à Z)',
                        value: 'title'
                    }, {
                        label: `date (récent - ancien)`,
                        value: 'date'
                    }, {
                        label: `date (ancien - récent)`,
                        value: 'date2'
                    }
                ]
            });
        });

    });

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

    it('should return DONE if action is PUBLICATION_SEARCH_SUCCESS', function () {
        const searchState = publicationSearch(
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
        const searchState = publicationSearch(
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
        const searchState = publicationSearch(
            { status: 'state' },
            { type: LOGOUT }
        );
        assert.deepEqual(searchState, getDefaultState());
        delete window.sessionStorage;
    });

    it('should add first domains to state if action is LOGIN_SUCCESS', function () {
        const searchState = publicationSearch(
            { status: 'state' },
            { type: LOGIN_SUCCESS, response: { domains: [ 'first', 'second' ] } }
        );
        assert.deepEqual(searchState, { status: 'state', domain: 'first'});
    });

    it('should return default sort, limiter and facet if action is PUBLICATION_RESET', function () {
        const searchState = publicationSearch(
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
        assert.deepEqual(searchState, { status: 'state', limiters: defaultLimiters, activeFacets: [] });
    });

    it('should default status to NONE and term to ""', function () {
        window.sessionStorage = {
            getItem: () => null
        };
        const searchState = publicationSearch(undefined, { type: 'OTHER_ACTION_TYPE' });
        assert.deepEqual(searchState, {
            queries: [{
                term: '',
                field: null
            }],
            status: 'NONE',
            domain: undefined,
            limiters: defaultLimiters,
            activeFacets: [],
            sort: 'relevance',
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
                    label: `ISSN`,
                    value: 'IS'
                }, {
                    label: `ISBN`,
                    value: 'IB'
                }, {
                    label: `Resource`,
                    value: 'PT'
                }, {
                    label: `Editeur`,
                    value: 'PB'
                }
            ],
            availableSort: [
                {
                    label: 'pertinence',
                    value: 'relevance'
                }, {
                    label: 'titre (A à Z)',
                    value: 'title'
                }, {
                    label: `date (récent - ancien)`,
                    value: 'date'
                }, {
                    label: `date (ancien - récent)`,
                    value: 'date2'
                }
            ]
        });
        delete window.sessionStorage;
    });
});
