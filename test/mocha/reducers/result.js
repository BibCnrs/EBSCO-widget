'use strict';

import result from '../../../lib/reducers/result';
import { SHOW_ABSTRACT } from '../../../lib/actions';

describe('reducers result', function () {

    it ('should default state to empty object if none given', function () {
        assert.deepEqual(result(undefined, { type: 'OTHER_ACTION_TYPE' }), {});
    });

    it ('should return object with abstractShown property if action.type is SHOW_ABSTRACT and state is undefined', function () {
        assert.deepEqual(result(undefined, { type: SHOW_ABSTRACT, visibility: true }), { abstractShown: true });
        assert.deepEqual(result(undefined, { type: SHOW_ABSTRACT, visibility: false }), { abstractShown: false });
    });

    it ('should return state whith added abstractShown if action.type is SHOW_ABSTRACT', function () {
        const resultItem = { name: 'result', property: 'whatever' };
        assert.deepEqual(result(resultItem, { type: SHOW_ABSTRACT, visibility: true }), { ...resultItem, abstractShown: true });
        assert.deepEqual(result(resultItem, { type: SHOW_ABSTRACT, visibility: false }), { ...resultItem, abstractShown: false });
    });

});
