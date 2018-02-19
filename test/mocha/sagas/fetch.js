import { race, call, take, put } from 'redux-saga/effects';

import fetch from '../../../lib/sagas/fetch';
import fetchServices from '../../../lib/services/fetch';
import actions, { DISCONNECTED } from '../../../lib/actions';

describe('sagas fetch', function() {
    let iterator;
    let request = { url: 'bibcnrs.fr', config: 'data' };
    beforeEach(function() {
        iterator = fetch(request, 'STOP');
    });

    it('should race call(fetch) with take(STOP)', function() {
        const next = iterator.next();
        assert.deepEqual(
            next.value,
            race({
                fetchResult: call(fetchServices, request),
                cancel: take(['STOP', DISCONNECTED]),
            }),
        );
    });

    it('should return cancel result if it is present', function() {
        iterator.next();
        const next = iterator.next({
            cancel: 'cancel',
            fetchResult: 'fetchResult',
        });

        assert.deepEqual(next.value, { cancel: 'cancel' });
        assert.isTrue(next.done);
    });

    it('should return thhrown error by fetch if any', function() {
        iterator.next();
        const next = iterator.throw('error');

        assert.deepEqual(next.value, { error: 'error' });
        assert.isTrue(next.done);
    });

    it('should put logout and disconnected before returning cancel if fetchresult.error.code is 401', function() {
        iterator.next();
        let next = iterator.next({ fetchResult: { error: { code: 401 } } });

        assert.deepEqual(next.value, put(actions.logout()));
        next = iterator.next();
        assert.deepEqual(next.value, put(actions.disconnected()));
        next = iterator.next();
        assert.deepEqual(next.value, { cancel: true });
        assert.isTrue(next.done);
    });

    it('should return fetchResult if no cancel', function() {
        iterator.next();
        const next = iterator.next({ fetchResult: 'fetchResult' });

        assert.equal(next.value, 'fetchResult');
        assert.isTrue(next.done);
    });
});
