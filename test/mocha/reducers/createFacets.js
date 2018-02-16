import createFacets, * as fromState from '../../../lib/reducers/createFacets';

import {
    SEARCH_SUCCESS,
    CLEAR_FACET,
    CHANGE_FACET,
    LOGOUT,
    LINKED_SEARCH,
    RESTORE_HISTORY,
    RELOAD_HISTORY,
} from '../../../lib/actions';

describe('reducers createFacets', function() {
    describe('actions', function() {
        let categoryFacets;

        before(function() {
            categoryFacets = createFacets('category');
        });

        describe('SEARCH_SUCCESS', function() {
            it('should return action.response.activeFacets and action.response.facets', function() {
                const searchState = categoryFacets(
                    {},
                    {
                        type: SEARCH_SUCCESS,
                        category: 'category',
                        response: {
                            activeFacets: { active: ['facet'] },
                            facets: ['facets'],
                        },
                    },
                );
                assert.deepEqual(searchState, {
                    active: { active: ['facet'] },
                    available: ['facets'],
                });
            });

            it('should change only action.response.facets if action.response.totalHits is 0', function() {
                const searchState = categoryFacets(
                    {
                        active: { active: ['facet'] },
                        available: ['facets'],
                    },
                    {
                        type: SEARCH_SUCCESS,
                        category: 'category',
                        response: {
                            activeFacets: {},
                            facets: [],
                            totalHits: 0,
                        },
                    },
                );
                assert.deepEqual(searchState, {
                    available: [],
                    active: { active: ['facet'] },
                });
            });
        });

        it('should return defaultState if action is LOGOUT', function() {
            assert.deepEqual(
                categoryFacets(
                    { active: ['facet'] },
                    {
                        type: LOGOUT,
                        category: 'category',
                    },
                ),
                fromState.defaultState,
            );
        });

        it('should return empty activeFacets if action is CLEAR_FACET OR LINKED_SEARCH', function() {
            [CLEAR_FACET, LINKED_SEARCH].map(type =>
                assert.deepEqual(
                    categoryFacets(
                        {
                            active: { facet: 'value' },
                            available: ['facets'],
                        },
                        { type, category: 'category' },
                    ),
                    {
                        active: {},
                        available: ['facets'],
                    },
                ),
            );
        });

        it('should add action.value to [action.name] if action is CHANGE_FACET and checked is true', function() {
            const searchState = categoryFacets(
                { active: { id: ['old value'] } },
                {
                    type: CHANGE_FACET,
                    category: 'category',
                    id: 'id',
                    value: 'new value',
                    checked: true,
                },
            );
            assert.deepEqual(searchState, {
                active: { id: ['old value', 'new value'] },
            });
        });

        it('should initialize action.value to [action.id] if action is CHANGE_FACET and checked is true and there was no value yet', function() {
            const searchState = categoryFacets(
                { active: {} },
                {
                    type: CHANGE_FACET,
                    category: 'category',
                    id: 'id',
                    value: 'value',
                    checked: true,
                },
            );
            assert.deepEqual(searchState, {
                active: { id: ['value'] },
            });
        });

        it('should remove action.value from [action.name] if action is CHANGE_FACET and checked is false', function() {
            const searchState = categoryFacets(
                { active: { id: ['value', 'other'] } },
                {
                    type: CHANGE_FACET,
                    category: 'category',
                    id: 'id',
                    value: 'value',
                    checked: false,
                },
            );
            assert.deepEqual(searchState, {
                active: { id: ['other'] },
            });
        });

        it('should change nothing if action is CHANGE_FACET checked is false and value was not in [action.id]', function() {
            const searchState = categoryFacets(
                { active: { id: ['other'] } },
                {
                    type: CHANGE_FACET,
                    category: 'category',
                    id: 'id',
                    value: 'value',
                    checked: false,
                },
            );
            assert.deepEqual(searchState, {
                active: { id: ['other'] },
            });
        });

        it('should return action.query.activeFacets if action is RELOAD_HISTORY or RESTORE_HISTORY', function() {
            assert.deepEqual(
                categoryFacets(null, {
                    type: RELOAD_HISTORY,
                    category: 'category',
                    query: { activeFacets: { facet: ['value'] } },
                }),
                {
                    active: { facet: ['value'] },
                    available: [],
                },
            );
            assert.deepEqual(
                categoryFacets(null, {
                    type: RESTORE_HISTORY,
                    category: 'category',
                    query: { activeFacets: { facet: ['value'] } },
                }),
                {
                    active: { facet: ['value'] },
                    available: [],
                },
            );
        });
    });

    describe('selector', function() {
        describe('hasActiveFacet', function() {
            it('should return true if there is at least an active facet', function() {
                assert.isTrue(
                    fromState.hasActiveFacet({
                        active: { 0: 'active facet value' },
                    }),
                );
            });

            it('should return false if there no active facet', function() {
                assert.isFalse(fromState.hasActiveFacet({ active: {} }));
            });
        });
    });
});
