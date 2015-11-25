'use strict';

import { Map } from 'immutable';
import search from '../../../lib/reducers/search';
import { SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_ERROR, TERM_CHANGE } from '../../../lib/actions';

describe('reducers search', function () {
    it ('should return PENDING if action is SEARCH_PENDING', function () {
        assert.deepEqual(search(Map({ term: 'my search', status: 'NONE' }), { type: SEARCH_PENDING }).toJS(), { term: 'my search', status: 'PENDING' });
    });

    it ('should return SUCCESS if action is SEARCH_SUCCESS', function () {
        assert.deepEqual(search(Map({ status: 'NONE', term: 'aids' }), { type: SEARCH_SUCCESS }).toJS(), { status: 'SUCCESS', term: 'aids', searchedTerm: 'aids' });
    });

    it ('should return ERROR and error message if action is SEARCH_ERROR', function () {
        assert.deepEqual(search(Map({ status: 'NONE' }), { type: SEARCH_ERROR, error: { message: 'boom' } }).toJS(), { status: 'ERROR', error: 'boom' });
    });

    it ('should update term with action.term if action is TERM_CHANGE', function () {
        assert.deepEqual(search(Map({ status: 'state' }), { type: TERM_CHANGE, term: 'searched term' }).toJS(), { status: 'state', term: 'searched term' });
    });

    it ('should return passed state if action is none of the above', function () {
        assert.deepEqual(search(Map({ status: 'state' }), { type: 'OTHER_ACTION_TYPE' }), Map({ status: 'state' }));
    });


    it ('should default status to NONE and term to "" if none given', function () {
        assert.deepEqual(search(undefined, { type: 'OTHER_ACTION_TYPE' }), Map({ term: '', status: 'NONE' }));
    });
});
