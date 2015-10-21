'use strict';

import { List, Map } from 'immutable';
import results from '../../../lib/reducers/results';
import { SEARCH_SUCCESS, SEARCH_ERROR, SHOW_ABSTRACT } from '../../../lib/actions';

describe('reducers results', function () {
    const resultList = List([
        Map({ name: 'result1' }),
        Map({ name: 'result2' }),
        Map({ name: 'result3' })
    ]);

    it ('should default state to empty arrray if none given', function () {
        assert.deepEqual(results(undefined, { type: 'OTHER_ACTION_TYPE' }), List());
    });

    it ('should return given state if not concernerd by ACTION', function () {
        assert.deepEqual(results(resultList, { type: 'OTHER_ACTION_TYPE' }), resultList);
    });

    it ('should return action.reponse if action type is SEARCH_SUCCESS', function () {
        assert.deepEqual(results(undefined, { type: SEARCH_SUCCESS, response: resultList }), resultList);
    });

    it ('should return empty array if action type is SEARCH_ERROR', function () {
        assert.deepEqual(results(resultList, { type: SEARCH_ERROR, error: 'error' }), List());
    });

    it ('should replace action.index item in result with result modified with abstractShown boolean equal to action.visibility', function () {
        const action = { type: SHOW_ABSTRACT, index: 1, visibility: true };
        assert.deepEqual(results(resultList, action), resultList.set(action.index, resultList.get(action.index).set('abstractShown', action.visibility)));
    });

});
