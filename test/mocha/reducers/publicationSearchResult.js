import publicationSearchResult, { defaultState } from '../../../lib/reducers/publicationSearchResult';

import {
    PUBLICATION,
    LOGOUT
} from '../../../lib/actions';

describe('reducers publicationSearchResult', function () {

    it('should set [action.response.currentPage] to action.response.results if action is SEARCH_SUCCESS', function () {
        assert.deepEqual(
            publicationSearchResult({ maxPage: 0 }, {
                type: PUBLICATION.SEARCH_SUCCESS,
                response: {
                    maxPage: 10,
                    totalHits: 200,
                    results: ['results data'],
                    facets: ['facet1', 'facet2'],
                    currentPage: 2
                }
            }),
            {
                maxPage: 10,
                totalHits: 200,
                2: ['results data'],
                facets: ['facet1', 'facet2'],
                currentPage: 2
            }
        );
    });

    it('should return default state if action is PUBLICATION_SEARCH_TERM, PUBLICATION_LIMIT_SEARCH, LOGOUT or TRIGGER_EBSCO_ACTION', function () {
        const actionTypes = [
            PUBLICATION.SEARCH_TERM,
            PUBLICATION.LIMIT_SEARCH,
            PUBLICATION.CHANGE_RESULTS_PER_PAGE,
            LOGOUT
        ];

        actionTypes.map((type) => assert.deepEqual(
            publicationSearchResult({
                maxPage: 10,
                totalHits: 200,
                2: ['results data'],
                currentPage: 2
            }, { type }),
            defaultState
        ));
    });

    it('should set currentPage to action.page if action is PAGE_LOAD', function () {
        assert.deepEqual(
            publicationSearchResult({ maxPage: 0 }, {
                type: PUBLICATION.PAGE_LOAD,
                page: 7
            }),
            {
                maxPage: 0,
                currentPage: 7
            }
        );
    });

    it('should return state on other action', function () {
        assert.deepEqual(
            publicationSearchResult({ some: 'state' }, {
                type: 'OTHER_ACTION'
            }),
            { some: 'state' }
        );
    });

});
