import a2zSearch, { defaultState } from '../../../lib/reducers/a2zSearch';

import {
    SEARCH_TERM,
    SEARCH_PENDING,
    SEARCH_ERROR
} from '../../../lib/actions/a2z';

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
});
