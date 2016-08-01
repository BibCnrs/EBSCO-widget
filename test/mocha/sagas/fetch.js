import { race, call, take } from 'redux-saga/effects';

import fetch from '../../../lib/sagas/fetch';
import fetchServices from '../../../lib/services/fetch';

describe('sagas fetch', function () {
    let iterator;
    let request = { url: 'bibcnrs.fr', config: 'data' };
    beforeEach(function () {
        iterator = fetch(request, 'STOP');
    });

    it('should race call(fetch) with take(STOP)', function () {
        const next = iterator.next();
        assert.deepEqual(next.value, race({
            fetchResult: call(fetchServices, request),
            cancel: take('STOP')
        }));
    });

    it('should return cancel result if it is present', function () {
        iterator.next();
        const next = iterator.next({ cancel: 'cancel', fetchResult: 'fetchResult' });

        assert.deepEqual(next.value, { cancel: 'cancel'});
        assert.isTrue(next.done);
    });

    it('should return thhrown error by fetch if any', function () {
        iterator.next();
        const next = iterator.throw('error');

        assert.deepEqual(next.value, { error: 'error' });
        assert.isTrue(next.done);
    });

    it('should return fetchResult if no cancel', function () {
        iterator.next();
        const next = iterator.next({ fetchResult: 'fetchResult' });

        assert.equal(next.value, 'fetchResult');
        assert.isTrue(next.done);
    });

});
