import articleQueryList, { defaultState, defaultArticleQuery } from '../../../lib/reducers/articleQueryList';

import {
    ADD_QUERY,
    REMOVE_QUERY,
    CHANGE_QUERY,
    LINKED_SEARCH
} from '../../../lib/actions/article';

describe('reducers articleQueryList', function () {
    const queryList = [
        { boolean: 'AND', term: 'term1', field: 'TI' },
        { boolean: 'AND', term: 'term2', field: 'AU' },
        { boolean: 'AND', term: 'term3', field: 'SU' }
    ];

    it ('should default state to arrray with one defaultQuery if none given', function () {
        assert.deepEqual(articleQueryList(undefined, { type: 'OTHER_ACTION_TYPE' }), [defaultArticleQuery]);
    });

    it ('should return given state if not concernerd by ACTION', function () {
        assert.deepEqual(articleQueryList(queryList, { type: 'OTHER_ACTION_TYPE' }), queryList);
    });

    it ('should add a defaultArticleQuery at action.index if action type is ARTICLE_ADD_QUERY', function () {
        assert.deepEqual(articleQueryList(queryList, { type: ADD_QUERY, index: 1 }), [
            queryList[0],
            queryList[1],
            defaultArticleQuery,
            queryList[2]
        ]);
    });

    it ('should add a defaultArticleQuery at action.index if action type is ARTICLE_ADD_QUERY', function () {
        assert.deepEqual(articleQueryList(queryList.slice(2), { type: ADD_QUERY, index: 1 }), [
            queryList[2],
            defaultArticleQuery
        ]);
    });

    it ('should remove query at action.index if action type is ARTICLE_REMOVE_QUERY', function () {
        assert.deepEqual(articleQueryList(queryList, { type: REMOVE_QUERY, index: 1 }), [
            queryList[0],
            queryList[2]
        ]);
    });

    it ('should not remove query at action.index if it is the las query when action type is ARTICLE_REMOVE_QUERY', function () {
        const queryList = [{ boolean: 'AND', term: 'last', field: 'TI' }];
        assert.deepEqual(articleQueryList(queryList, { type: REMOVE_QUERY, index: 0 }), queryList);
    });

    it('should set query[action.key] to action.value at index when action is ARTICLE_CHANGE_QUERY', function () {
        assert.deepEqual(articleQueryList(queryList, { type: CHANGE_QUERY, key: 'term', value: 'new term', index: 1 }), [
            queryList[0],
            { ...queryList[1], term: 'new term' },
            queryList[2]
        ]);

        assert.deepEqual(articleQueryList(queryList, { type: CHANGE_QUERY, key: 'boolean', value: 'OR', index: 1 }), [
            queryList[0],
            { ...queryList[1], boolean: 'OR' },
            queryList[2]
        ]);
    });

    it('should return one single query with term = action.term, field = action.field and boolean=AND when action type is ARTICLE_LINKED_SEARCH', function () {
        assert.deepEqual(articleQueryList(queryList, { type: LINKED_SEARCH, term: 'term', field: 'AU' }), [{ boolean: 'AND', term: 'term', field: 'AU' }]);
    });

});
