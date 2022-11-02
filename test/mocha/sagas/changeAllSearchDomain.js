import { put, select } from 'redux-saga/effects';

import { changeAllSearchDomain } from '../../../lib/sagas/changeAllSearchDomain';

import actions, { CHANGE_ALL_SEARCH_DOMAIN } from '../../../lib/actions';
import * as fromState from '../../../lib/selectors';

describe('sagas changeAllSearchDomain', function() {
    let iterator;
    const action = {
        category: 'article',
        type: CHANGE_ALL_SEARCH_DOMAIN,
        domain: 'INSHS',
    };
    beforeEach(function() {
        iterator = changeAllSearchDomain(action);
    });

    it('should put changeDomain for article and publication', function() {
        let next = iterator.next();
        assert.deepEqual(
            next.value,
            put(actions.changeDomain('article', 'INSHS')),
        );
        next = iterator.next();
        assert.deepEqual(
            next.value,
            put(actions.changeDomain('publication', 'INSHS')),
        );
        next = iterator.next();
        assert.deepEqual(
            next.value,
            put(actions.changeDomain('database', 'INSHS')),
        );
        next = iterator.next();
        assert.deepEqual(next.value, select(fromState.getLocation));

        next = iterator.next();
        assert.isTrue(next.done);
    });
});
