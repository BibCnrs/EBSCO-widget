import { put, select, call } from 'redux-saga/effects';

import { apiUpdateProfile } from '../../../lib/sagas/apiUpdateProfile';
import * as fromState from '../../../lib/selectors';
import fetch from '../../../lib/sagas/fetch';
import actions from '../../../lib/actions';

describe('sagas apiUpdateProfile', function () {
    let iterator;
    let action = {
        data: {
            favorite_domain: 'foo',
        }
    };
    beforeEach(function () {
        iterator = apiUpdateProfile(action);
    });

    it('should select getApiUpdateProfileRequest', function () {
        const next = iterator.next();
        assert.deepEqual(next.value, select(fromState.getApiUpdateProfileRequest));
    });

    it('should trigger updateProfilePending', function () {
        iterator.next();
        const next = iterator.next({ request: 'object' });

        assert.deepEqual(next.value, put(actions.updateProfilePending()));
    });


    it('should call the fetch for the apiUpdateProfileRequest', function () {
        iterator.next();
        iterator.next({ request: 'object' });
        const next = iterator.next();

        assert.deepEqual(next.value, call(fetch, { request: 'object' }, [], false));
    });

    it('should trigger updateProfileCancel if receiving cancel', function () {
        iterator.next();
        iterator.next();
        iterator.next({ request: 'object' });
        const next = iterator.next({ cancel: true, response: 'response' });

        assert.deepEqual(next.value, put(actions.updateProfileCancel()));
        assert.isTrue(iterator.next().done);
    });

    it('should trigger updateProfileError if receiving error', function () {
        iterator.next();
        iterator.next();
        iterator.next({ request: 'object' });
        const next = iterator.next({ response: 'response', error: 'error' });

        assert.deepEqual(next.value, put(actions.updateProfileError('error')));
        assert.isTrue(iterator.next().done);
    });

    it('should trigger updateProfileSuccess if receiving response with no error', function () {
        iterator.next();
        iterator.next();
        iterator.next({ request: 'object' });
        const next = iterator.next({ response: 'response' });

        assert.deepEqual(next.value, put(actions.updateProfileSuccess('response')));
    });

});
