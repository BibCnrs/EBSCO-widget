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

    it('should set [action.name] to action.values it action is ARTICLE_CHANGE_FACET', function () {
        const searchState = articleActiveFacets(
            { active: ['facet'] },
            { type: CHANGE_FACET, name: 'key', values: [1, 2, 3] }
        );
        assert.deepEqual(searchState, {
            active: ['facet'],
            key: [1, 2, 3]
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
