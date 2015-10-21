'use strict';

import search from '../../../lib/reducers/search';
import { SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_ERROR } from '../../../lib/actions';

describe('reducers search', function () {
    it ('should return PENDING if action is SEARCH_PENDING', function () {
        assert.equal(search('NONE', { type: SEARCH_PENDING }), 'PENDING');
    });

    it ('should return SUCCESS if action is SEARCH_SUCCESS', function () {
        assert.equal(search('NONE', { type: SEARCH_SUCCESS }), 'SUCCESS');
    });

    it ('should return ERROR if action is SEARCH_ERROR', function () {
        assert.equal(search('NONE', { type: SEARCH_ERROR }), 'ERROR');
    });

    it ('should return passed state if action is none of the above', function () {
        assert.equal(search('state', { type: 'OTHER_ACTION_TYPE' }), 'state');
    });

    it ('should default state to NONE if none given', function () {
        assert.equal(search(undefined, { type: 'OTHER_ACTION_TYPE' }), 'NONE');
    });
});
