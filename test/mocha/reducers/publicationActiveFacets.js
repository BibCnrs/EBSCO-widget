import publicationActiveFacets, { defaultState } from '../../../lib/reducers/publicationActiveFacets';

import {
    LOGOUT,
    PUBLICATION
} from '../../../lib/actions';

const {
    CHANGE_FACET,
    SEARCH_SUCCESS,
    RESET
} = PUBLICATION;

describe('reducers publicationActiveFacets', function () {

    it('should return action.response.activeFacets if action is PUBLICATION_SEARCH_SUCCESS', function () {
        const searchState = publicationActiveFacets(
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

    it('should return defaultState if action is PUBLICATION_RESET OR LOGOUT', function () {
        assert.deepEqual(publicationActiveFacets({ active: ['facet'] },{ type: RESET }), defaultState);
        assert.deepEqual(publicationActiveFacets({ active: ['facet'] },{ type: LOGOUT }), defaultState);
    });

    it('should add action.value to [action.id] if action is PUBLICATION_CHANGE_FACET and checked is true', function () {
        const searchState = publicationActiveFacets(
            { active: ['facet'] },
            { type: CHANGE_FACET, id: 'active', value: 'new', checked: true }
        );
        assert.deepEqual(searchState, {
            active: ['facet', 'new']
        });
    });

    it('should initialize action.value to [action.id] if action is PUBLICATION_CHANGE_FACET and checked is true and there was no value yet', function () {
        const searchState = publicationActiveFacets(
            {},
            { type: CHANGE_FACET, id: 'active', value: 'facet', checked: true }
        );
        assert.deepEqual(searchState, {
            active: ['facet']
        });
    });

    it('should remove action.value from [action.id] if action is PUBLICATION_CHANGE_FACET and checked is false', function () {
        const searchState = publicationActiveFacets(
            { active: ['facet', 'other'] },
            { type: CHANGE_FACET, id: 'active', value: 'facet', checked: false }
        );
        assert.deepEqual(searchState, {
            active: ['other']
        });
    });

    it('should change nothing if action is PUBLICATION_CHANGE_FACET checked is false and value was not in [action.id]', function () {
        const searchState = publicationActiveFacets(
            { active: ['facet'] },
            { type: CHANGE_FACET, id: 'active', value: 'other', checked: false }
        );
        assert.deepEqual(searchState, {
            active: ['facet']
        });
    });

});
