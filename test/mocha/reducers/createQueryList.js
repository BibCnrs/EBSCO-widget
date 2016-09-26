import createQueryList, * as fromQueryList from '../../../lib/reducers/createQueryList';

import {
    ADD_QUERY,
    REMOVE_QUERY,
    CHANGE_QUERY,
    LINKED_SEARCH,
    RESTORE_HISTORY,
    RELOAD_HISTORY,
    SUGGEST_TERMS,
    SEARCH,
    EXACT_MATCH_SEARCH
    } from '../../../lib/actions';

describe('reducers createQueryList', function () {

    describe('Actions', function() {
        let articleQueryList;

        before(function () {
            articleQueryList = createQueryList('article');
        });

        it('should add a new default query at action.index with new key for article if action is ADD_QUERY and category article and reset suggest"d terms for the other query', function () {
            const queryListState = articleQueryList(
                [{ term: 1 }, { term: 2 }, { term: 3 }],
                { type: ADD_QUERY, category: 'article', index: 1 }
            );
            assert.deepEqual(queryListState, [
                { term: 1, suggestedTerms: [] },
                { term: 2, suggestedTerms: []  },
                {
                    ...fromQueryList.defaultQuery['article'],
                    key: queryListState[2].key
                },
                { term: 3, suggestedTerms: []  }
            ]);
        });

        it('should not add a new default query at action.index with new key for article if action is ADD_QUERY but category is not article', function () {
            const queryListState = articleQueryList(
                [1, 2, 3],
                { type: ADD_QUERY, category: 'publication', index: 1 }
            );
            assert.deepEqual(queryListState, [1, 2, 3]);
        });

        it('should remove query at action.index if action is REMOVE_QUERY and category is article and reset suggest"d terms for the other query', function () {
            const queryListState = articleQueryList(
                [{ term: 1, suggestedTerms: ['suggestions'] }, 2, { term: 3, suggestedTerms: ['suggestions'] }],
                { type: REMOVE_QUERY, category: 'article', index: 1 }
            );
            assert.deepEqual(queryListState, [{ term: 1, suggestedTerms: [] }, { term: 3, suggestedTerms: [] }]);
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

        it('should change query at action.key and action.index if action is CHANGE_QUERY and category article and reset suggest"d terms for the other query', function () {
            const queryListState = articleQueryList(
                [
                    { term: 'old' },
                    { term: 'old' },
                    { term: 'old' }
                ],
                { type: CHANGE_QUERY, category: 'article', key: 'term', index: 1, value: 'new' }
            );
            assert.deepEqual(queryListState, [
                { term: 'old', suggestedTerms: [] },
                { term: 'new' },
                { term: 'old', suggestedTerms: [] }
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

        describe('SUGGEST_TERMS', function () {
            it('should set suggestedTerms to actions.terms for query at action.index', function () {
                const queryListState = articleQueryList(
                    [
                        { term: 'first' },
                        { term: 'second' },
                        { term: 'third' }
                    ],
                    { type: SUGGEST_TERMS, category: 'article', index: 1, terms: [' son', ' to finish', 'ary'] }
                );
                assert.deepEqual(queryListState, [
                    { term: 'first' },
                    { term: 'second', suggestedTerms: [' son', ' to finish', 'ary'] },
                    { term: 'third' }
                ]);
            });
        });

        describe('SEARCH', function () {
            it('should empty all suggestedTerms for all query', function () {
                const queryListState = articleQueryList(
                    [
                        { term: 'first', suggestedTerms: ['man'] },
                        { term: 'second', suggestedTerms: [' son', ' to finish', 'ary'] },
                        { term: 'third' }
                    ],
                    { type: SEARCH, category: 'article', index: 1, terms: [' son', ' to finish', 'ary'] }
                );
                assert.deepEqual(queryListState, [
                    { term: 'first', suggestedTerms: [] },
                    { term: 'second', suggestedTerms: [] },
                    { term: 'third', suggestedTerms: [] }
                ]);
            });
        });

        describe('EXACT_MATCH_SEARCH', function () {
            it('should return defaultState with term set to action.term', function () {
                assert.deepEqual(
                    articleQueryList([{ some: 'state' }], { type: EXACT_MATCH_SEARCH, category: 'article', term: 'term' }),
                    [{
                        ...fromQueryList.defaultQuery['article'],
                        term: 'term'
                    }]
                );
            });
        });
    });

    describe('selector', function() {
        describe('isQueryListInA2zMode', function () {
            it('should return true if queryList is a singleQuery on field TI with term targeting <Letter>*', function() {
                assert.isTrue(fromQueryList.isQueryListInA2zMode([{
                    field: 'TI',
                    term: 'A*'
                }]));
            });

            it('should return false if the given letter is in lowercase', function() {
                assert.isFalse(fromQueryList.isQueryListInA2zMode([{
                    field: 'TI',
                    term: 'a*'
                }]));
            });

            it('should return false if the first char is not a letter', function() {
                assert.isFalse(fromQueryList.isQueryListInA2zMode([{
                    field: 'TI',
                    term: '0*'
                }]));
                assert.isFalse(fromQueryList.isQueryListInA2zMode([{
                    field: 'TI',
                    term: '_*'
                }]));
            });

            it('should return true if queryList is a singleQuery on field TI with term targeting <Letter><Letter>*', function() {
                assert.isTrue(fromQueryList.isQueryListInA2zMode([{
                    field: 'TI',
                    term: 'AB*'
                }]));
            });

            it('should return false if one of the given letter is in lowercase', function() {
                assert.isFalse(fromQueryList.isQueryListInA2zMode([{
                    field: 'TI',
                    term: 'aB*'
                }]));
                assert.isFalse(fromQueryList.isQueryListInA2zMode([{
                    field: 'TI',
                    term: 'Ab*'
                }]));
            });

            it('should return false if the first char is not a letter', function() {
                assert.isFalse(fromQueryList.isQueryListInA2zMode([{
                    field: 'TI',
                    term: '0B*'
                }]));
                assert.isFalse(fromQueryList.isQueryListInA2zMode([{
                    field: 'TI',
                    term: '_B*'
                }]));
            });

            it('should return false if the second char is not a letter', function() {
                assert.isFalse(fromQueryList.isQueryListInA2zMode([{
                    field: 'TI',
                    term: 'A0*'
                }]));
                assert.isFalse(fromQueryList.isQueryListInA2zMode([{
                    field: 'TI',
                    term: 'A_*'
                }]));
            });

            it('should return true if queryList is a singleQuery on field TI with term targeting "0* OR 1* OR...*"', function() {
                assert.isTrue(fromQueryList.isQueryListInA2zMode([{
                    field: 'TI',
                    term: '0* OR 1* OR 2* OR 3* OR 4* OR 5* OR 6* OR 7* OR 8* OR 9*'
                }]));
            });

            it('should return false if term continue after *', function() {
                assert.isFalse(fromQueryList.isQueryListInA2zMode([{
                    field: 'TI',
                    term: 'A*A'
                }]));
                assert.isFalse(fromQueryList.isQueryListInA2zMode([{
                    field: 'TI',
                    term: 'AB*A'
                }]));
                assert.isFalse(fromQueryList.isQueryListInA2zMode([{
                    field: 'TI',
                    term: '0* OR 1* OR 2* OR 3* OR 4* OR 5* OR 6* OR 7* OR 8* OR 9*A'
                }]));
            });

            it('should return false if field is not TI', function() {
                assert.isFalse(fromQueryList.isQueryListInA2zMode([{
                    field: 'AU',
                    term: 'A*'
                }]));
                assert.isFalse(fromQueryList.isQueryListInA2zMode([{
                    field: 'AU',
                    term: 'AB*'
                }]));
                assert.isFalse(fromQueryList.isQueryListInA2zMode([{
                    field: 'AU',
                    term: '0* OR 1* OR 2* OR 3* OR 4* OR 5* OR 6* OR 7* OR 8* OR 9*'
                }]));
            });

            it('should return false if more than one query', function() {
                assert.isFalse(fromQueryList.isQueryListInA2zMode([{
                    field: 'TI',
                    term: 'A*'
                }, { field: 'TI', term: 'A*'}]));
                assert.isFalse(fromQueryList.isQueryListInA2zMode([{
                    field: 'TI',
                    term: 'AB*'
                }, { field: 'TI', term: 'A*'}]));
                assert.isFalse(fromQueryList.isQueryListInA2zMode([{
                    field: 'TI',
                    term: '0* OR 1* OR 2* OR 3* OR 4* OR 5* OR 6* OR 7* OR 8* OR 9*'
                }, { field: 'TI', term: 'A*'}]));
            });

        });

        describe('getExactMatchQuery', function () {
            it('should return queries with field null', function () {
                assert.deepEqual(
                    fromQueryList.getExactMatchQuery([{ field: 'set', term: 'discarded' }, { field: null, term: 'kept' }]),
                    [{ field: null, term: 'kept' }]
                );
            });
        });
    });
});
