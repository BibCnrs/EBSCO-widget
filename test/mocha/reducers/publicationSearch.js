import publicationSearch, { defaultState } from '../../../lib/reducers/publicationSearch';
import { defaultState as defaultLimiters } from '../../../lib/reducers/publicationLimiters';
import { defaultState as defaultActiveFacets } from '../../../lib/reducers/publicationActiveFacets';

import {
    CHANGE_TERM,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    CHANGE_SORT,
    CHANGE_FIELD,
    CHANGE_RESULTS_PER_PAGE
} from '../../../lib/actions/publication';

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

    it('should set resultsPerPage to action.nbResults if action is PUBLICATION_CHANGE_RESULTS_PER_PAGE', function () {
        const searchState = publicationSearch(
            { status: 'state' },
            { type: CHANGE_RESULTS_PER_PAGE, nbResults: 50 }
        );
        assert.deepEqual(searchState, { status: 'state', resultsPerPage: 50 });
    });

    it('should update term with action.term if action is PUBLICATION_CHANGE_TERM', function () {
        const searchState = publicationSearch(
            { status: 'state' },
            { type: CHANGE_TERM, term: 'searched term' }
        );
        assert.deepEqual(searchState, { status: 'state', term: 'searched term' });
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
            limiters: defaultLimiters,
            activeFacets: defaultActiveFacets,
            sort: 'relevance',
            resultsPerPage: 20
        });
    });
});
