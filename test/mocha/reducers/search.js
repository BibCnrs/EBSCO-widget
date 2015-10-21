'use strict';

import { Map } from 'immutable';
import search from '../../../lib/reducers/search';
import { SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_ERROR } from '../../../lib/actions';

describe('reducers search', function () {
    it ('should return PENDING if action is SEARCH_PENDING', function () {
        assert.deepEqual(search(Map({ status: 'NONE' }), { type: SEARCH_PENDING }), Map({ status: 'PENDING' }));
    });

    it ('should return SUCCESS if action is SEARCH_SUCCESS', function () {
        assert.deepEqual(search(Map({ status: 'NONE' }), { type: SEARCH_SUCCESS }), Map({ status: 'SUCCESS' }));
    });

    it ('should return ERROR and error message if action is SEARCH_ERROR', function () {
        assert.deepEqual(search(Map({ status: 'NONE' }), { type: SEARCH_ERROR, error: { message: 'boom' } }), Map({ status: 'ERROR', error: 'boom' }));
    });

    it ('should return passed state if action is none of the above', function () {
        assert.deepEqual(search(Map({ status: 'state' }), { type: 'OTHER_ACTION_TYPE' }), Map({ status: 'state' }));
    });

    it ('should default state to NONE if none given', function () {
        assert.deepEqual(search(undefined, { type: 'OTHER_ACTION_TYPE' }), Map({ status: 'NONE' }));
    });
});
