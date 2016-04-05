import articleActiveFacets, { defaultState } from '../../../lib/reducers/articleActiveFacets';

import {
    LOGOUT,
    RELOAD_HISTORY,
    RESTORE_HISTORY,
    ARTICLE
} from '../../../lib/actions';

const {
    CHANGE_FACET,
    SEARCH_SUCCESS,
    RESET
} = ARTICLE;

describe('reducers articleActiveFacets', function () {

    it('should return action.response.activeFacets if action is ARTICLE_SEARCH_SUCCESS', function () {
        const searchState = articleActiveFacets(
            {},
            {
                type: SEARCH_SUCCESS,
                response: {
                    activeFacets: { active: ['facet'] }
                }
            }
        );
        assert.deepEqual(searchState, { active: ['facet'] });
    });

    it('should return defaultState if action is ARTICLE_RESET OR LOGOUT', function () {
        assert.deepEqual(articleActiveFacets({ active: ['facet'] },{ type: RESET }), defaultState);
        assert.deepEqual(articleActiveFacets({ active: ['facet'] },{ type: LOGOUT }), defaultState);
    });

    it('should add action.value to [action.name] if action is ARTICLE_CHANGE_FACET and checked is true', function () {
        const searchState = articleActiveFacets(
            { active: ['facet'] },
            { type: CHANGE_FACET, id: 'active', value: 'new', checked: true }
        );
        assert.deepEqual(searchState, {
            active: ['facet', 'new']
        });
    });

    it('should initialize action.value to [action.id] if action is ARTICLE_CHANGE_FACET and checked is true and there was no value yet', function () {
        const searchState = articleActiveFacets(
            { },
            { type: CHANGE_FACET, id: 'active', value: 'facet', checked: true }
        );
        assert.deepEqual(searchState, {
            active: ['facet']
        });
    });

    it('should remove action.value from [action.name] if action is ARTICLE_CHANGE_FACET and checked is false', function () {
        const searchState = articleActiveFacets(
            { active: ['facet', 'other'] },
            { type: CHANGE_FACET, id: 'active', value: 'facet', checked: false }
        );
        assert.deepEqual(searchState, {
            active: ['other']
        });
    });

    it('should change nothing if action is ARTICLE_CHANGE_FACET checked is false and value was not in [action.id]', function () {
        const searchState = articleActiveFacets(
            { active: ['facet'] },
            { type: CHANGE_FACET, id: 'active', value: 'other', checked: false }
        );
        assert.deepEqual(searchState, {
            active: ['facet']
        });
    });

    it('should return action.query.activeFacets if action is RELOAD_HISTORY or RESTORE_HISTORY', function () {
        assert.deepEqual(articleActiveFacets(
            null,
            { type: RELOAD_HISTORY, query: { activeFacets: { active: ['facet'] } } }
        ), { active: ['facet'] });
        assert.deepEqual(articleActiveFacets(
            null,
            { type: RESTORE_HISTORY, query: { activeFacets: { active: ['facet'] } } }
        ), { active: ['facet'] });
    });

});
