import facets from '../../../lib/reducers/facets';
import {
    SEARCH_SUCCESS,
    LOGOUT
} from '../../../lib/actions';

describe('reducers facets', function () {
    const facetList = [ 1, 2, 3];

    it ('should default state to empty arrray if none given', function () {
        assert.deepEqual(facets(undefined, { type: 'OTHER_ACTION_TYPE' }), []);
    });

    it ('should return default state if action type is LOGOUT', function () {
        assert.deepEqual(facets([ 'facet1', 'facet2' ], { type: LOGOUT }), []);
    });

    it ('should return given state if not concernerd by ACTION', function () {
        assert.deepEqual(facets(facetList, { type: 'OTHER_ACTION_TYPE' }), facetList);
    });

    it ('should return action.reponse.facets if action type is SEARCH_SUCCESS', function () {
        assert.deepEqual(facets([], { type: SEARCH_SUCCESS, response: { facets: facetList } }), facetList);
    });

});
