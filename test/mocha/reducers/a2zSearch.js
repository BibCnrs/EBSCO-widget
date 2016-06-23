import a2zSearch, { defaultState } from '../../../lib/reducers/a2zSearch';

import {
    SEARCH_TERM,
    SEARCH_PENDING,
    SEARCH_ERROR,
    CHANGE_RESULTS_PER_PAGE
} from '../../../lib/actions';

describe('reducers a2zSearch', function () {

    it('should set firstLetter and secondLetter to Action.firstLetter and action.secondLetter when action is A2Z_SEARCH_TERM', function () {
        const searchState = a2zSearch(
            { status: 'NONE' },
            { type: SEARCH_TERM, firstLetter: 'A', secondLetter: 'Z' }
        );
        assert.deepEqual(searchState, {
            status: 'NONE',
            firstLetter: 'A',
            secondLetter: 'Z'
        });

    });

    it('should set resultsPerPage to Action.nbResults when action is A2Z_CHANGE_RESULTS_PER_PAGE', function () {
        const searchState = a2zSearch(
            { status: 'NONE' },
            { type: CHANGE_RESULTS_PER_PAGE, nbResults: 50 }
        );
        assert.deepEqual(searchState, {
            status: 'NONE',
            resultsPerPage: 50
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

    it('should return defaultState when no previous state', function () {
        const searchState = a2zSearch(
            undefined,
            { type: 'WHATEVER' }
        );
        assert.deepEqual(searchState, defaultState);
    });
});
