import createQueryList, * as fromQueryList from '../../../lib/reducers/createQueryList';

import {
    ADD_QUERY,
    REMOVE_QUERY,
    CHANGE_QUERY,
    LINKED_SEARCH,
    RESTORE_HISTORY,
    RELOAD_HISTORY
    } from '../../../lib/actions';

describe('reducers createQueryList', function () {

    let articleQueryList;

    before(function () {
        articleQueryList = createQueryList('article');
    });

    it('should add a new default query at action.index with new key for article if action is ADD_QUERY and category article', function () {
        const queryListState = articleQueryList(
            [1, 2, 3],
            { type: ADD_QUERY, category: 'article', index: 1 }
        );
        assert.deepEqual(queryListState, [1, 2, {
            ...fromQueryList.defaultQuery['article'],
            key: queryListState[2].key
        }, 3]);
    });

    it('should not add a new default query at action.index with new key for article if action is ADD_QUERY but category is not article', function () {
        const queryListState = articleQueryList(
            [1, 2, 3],
            { type: ADD_QUERY, category: 'publication', index: 1 }
        );
        assert.deepEqual(queryListState, [1, 2, 3]);
    });

    it('should remove query at action.index if action is REMOVE_QUERY and category is article', function () {
        const queryListState = articleQueryList(
            [1, 2, 3],
            { type: REMOVE_QUERY, category: 'article', index: 1 }
        );
        assert.deepEqual(queryListState, [1, 3]);
    });

    it('should not remove query at action.index if action is ADD_QUERY and category is article but there is only one query', function () {
        const queryListState = articleQueryList(
            [1],
            { type: REMOVE_QUERY, category: 'article', index: 0 }
        );
        assert.deepEqual(queryListState, [1]);
    });

    it('should not remove query at action.index if action is REMOVE_QUERY but category is not article', function () {
        const queryListState = articleQueryList(
            [1, 2, 3],
            { type: REMOVE_QUERY, category: 'publication', index: 1 }
        );
        assert.deepEqual(queryListState, [1, 2, 3]);
    });

    it('should change query at action.key and action.index if action is CHANGE_QUERY and category article', function () {
        const queryListState = articleQueryList(
            [
                { term: 'old' },
                { term: 'old' },
                { term: 'old' }
            ],
            { type: CHANGE_QUERY, category: 'article', key: 'term', index: 1, value: 'new' }
        );
        assert.deepEqual(queryListState, [
            { term: 'old' },
            { term: 'new' },
            { term: 'old' }
        ]);
    });

    it('should set queryList to a singleQuery with given action term and field if action is LINKED_SEARCH', function () {
        const queryListState = articleQueryList(
            [
                { term: 'old' },
                { term: 'old' },
                { term: 'old' }
            ],
            { type: LINKED_SEARCH, category: 'article', term: 'term', field: 'TI' }
        );
        assert.deepEqual(queryListState, [
            { term: 'term', field: 'TI', boolean: 'AND' }
        ]);
    });

    it('should set queryList to a singleQuery with given action term and field as term if action is LINKED_SEARCH but given field is not available', function () {
        const queryListState = articleQueryList(
            [
                { term: 'old' },
                { term: 'old' },
                { term: 'old' }
            ],
            { type: LINKED_SEARCH, category: 'article', term: 'term', field: 'field' }
        );
        assert.deepEqual(queryListState, [
            { term: 'field term', field: null, boolean: 'AND' }
        ]);
    });

    it('should set queryList to action.query.queries if action is RELOAD_HISTORY', function () {
        const queryListState = articleQueryList(
            [
                { term: 'old' },
                { term: 'old' },
                { term: 'old' }
            ],
            { type: RELOAD_HISTORY, category: 'article', query: { queries: 'queries content' } }
        );
        assert.equal(queryListState, 'queries content');
    });

    it('should set queryList to action.query.queries if action is RESTORE_HISTORY', function () {
        const queryListState = articleQueryList(
            [
                { term: 'old' },
                { term: 'old' },
                { term: 'old' }
            ],
            { type: RESTORE_HISTORY, category: 'article', query: { queries: 'queries content' } }
        );
        assert.equal(queryListState, 'queries content');
    });

});
