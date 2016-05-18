import a2zSearch, { defaultState } from '../../../lib/reducers/a2zSearch';

import {
    SEARCH_TERM,
    SEARCH_PENDING,
    SEARCH_ERROR
} from '../../../lib/actions/a2z';

describe('reducers a2zSearch', function () {

    it('should set queries to Action.queries when action is A2Z_SEARCH_TERM', function () {
        const searchState = a2zSearch(
            { status: 'NONE' },
            { type: SEARCH_TERM, queries: ['queries'] }
        );
        assert.deepEqual(searchState, {
            status: 'NONE',
            queries: ['queries']
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
