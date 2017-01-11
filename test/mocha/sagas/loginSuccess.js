import { put, select, call } from 'redux-saga/effects';

import { loginSuccess } from '../../../lib/sagas/loginSuccess';
import * as fromState from '../../../lib/selectors';
import { sessionStorage } from '../../../lib/services/storage';
import actions from '../../../lib/actions';

describe('sagas loginSuccess', function () {
    let iterator;
    let action = {
        response: {
            username: 'john',
            domains: ['INSB', 'INSHS']
        }
    };
    beforeEach(function () {
        iterator = loginSuccess(action);
    });

    it('should call sessionStorage.setItem three times', function () {
        let next = iterator.next();
        assert.deepEqual(next.value, call(sessionStorage.setItem, 'EBSCO_WIDGET_username', 'john'));
        next = iterator.next();
        assert.deepEqual(next.value, call(sessionStorage.setItem, 'EBSCO_WIDGET_availableDomains', ['INSB', 'INSHS']));
        next = iterator.next();
        assert.deepEqual(next.value, call(sessionStorage.setItem, 'EBSCO_WIDGET_domain', 'INSB'));
    });

    it('should put noDomainError and end if no domain', () => {
        iterator = loginSuccess({
            response: {
                username: 'john',
                domains: []
            }
        });
        iterator.next();
        iterator.next();
        iterator.next();

        const next = iterator.next();
        assert.deepEqual(next.value, put(actions.noDomainError()));
    });

    it('should select hasPublicationSearchResult', () => {
        iterator.next();
        iterator.next();
        iterator.next();

        const next = iterator.next();
        assert.deepEqual(next.value, select(fromState.hasPublicationSearchResult));
    });

    it('should select hasDomainSetFromUrl', () => {
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();

        const next = iterator.next();
        assert.deepEqual(next.value, select(fromState.hasDomainSetFromUrl));
    });

    it('should put changeDomain if hasPublicationSearchResult is false', () => {
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next(false);

        const next = iterator.next(false);
        assert.deepEqual(next.value, put(actions.changeDomain('publication', action.response.domains[0])));
    });

    it('should select pausedAction if hasPublicationSearchResult is true', function () {
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();

        const next = iterator.next(true);
        assert.deepEqual(next.value, select(fromState.getPausedAction));
    });

    it('should end if no pausedAction', function () {
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();

        iterator.next(true);
        const next = iterator.next(undefined);
        assert.isTrue(next.done);
    });

    it('should put retrieved pausedAction', function () {
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();

        iterator.next(true);
        const next = iterator.next({ type: 'PAUSED_ACTION'});
        assert.deepEqual(next.value, put({ type: 'PAUSED_ACTION' }));
    });

});
