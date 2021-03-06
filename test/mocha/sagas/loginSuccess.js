import { put, select, call } from 'redux-saga/effects';

import { loginSuccess } from '../../../lib/sagas/loginSuccess';
import updateDomain from '../../../lib/sagas/updateDomain';
import * as fromState from '../../../lib/selectors';
import { sessionStorage } from '../../../lib/services/storage';
import actions from '../../../lib/actions';

describe('sagas loginSuccess', function() {
    let iterator;
    let action = {
        response: {
            username: 'john',
            domains: ['INSB', 'INSHS'],
        },
    };
    beforeEach(function() {
        iterator = loginSuccess(action);
    });

    it('should call sessionStorage.setItem three times', function() {
        let next = iterator.next();
        assert.deepEqual(
            next.value,
            call(sessionStorage.setItem, 'EBSCO_WIDGET_username', 'john'),
        );
        next = iterator.next();
        assert.deepEqual(
            next.value,
            call(sessionStorage.setItem, 'EBSCO_WIDGET_availableDomains', [
                'INSB',
                'INSHS',
            ]),
        );
        next = iterator.next();
        assert.deepEqual(
            next.value,
            call(sessionStorage.setItem, 'EBSCO_WIDGET_domain', 'INSB'),
        );
    });

    it('should put noDomainError and end if no domain', () => {
        iterator = loginSuccess({
            response: {
                username: 'john',
                domains: [],
            },
        });
        iterator.next();
        iterator.next();
        iterator.next();

        const next = iterator.next();
        assert.deepEqual(next.value, put(actions.noDomainError()));
    });

    it('should call updateDomain', () => {
        iterator.next();
        iterator.next();
        iterator.next();

        const next = iterator.next();
        assert.deepEqual(next.value, call(updateDomain));
    });

    it('should select canPersistHistoryOnServer if no domainFromUrl', function() {
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();

        const next = iterator.next();
        assert.deepEqual(
            next.value,
            select(fromState.canPersistHistoryOnServer),
        );
    });

    it('should load history from server if canPersistHistoryOnServer is true', function() {
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();
        assert.deepEqual(
            iterator.next(true).value,
            put(actions.loadHistoryPage()),
        );
    });

    it('should end if no pausedAction', function() {
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();

        iterator.next();
        iterator.next(false);
        const next = iterator.next(false);
        assert.isTrue(next.done);
    });

    it('should put retrieved pausedAction', function() {
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();

        iterator.next();
        iterator.next(false);
        const next = iterator.next({ type: 'PAUSED_ACTION' });
        assert.deepEqual(next.value, put({ type: 'PAUSED_ACTION' }));
    });
});
