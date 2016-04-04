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

    it('should set [action.name] to action.values it action is PUBLICATION_CHANGE_FACET', function () {
        const searchState = publicationActiveFacets(
            { active: ['facet'] },
            { type: CHANGE_FACET, name: 'key', values: [1, 2, 3] }
        );
        assert.deepEqual(searchState, {
            active: ['facet'],
            key: [1, 2, 3]
        });
    });

});
