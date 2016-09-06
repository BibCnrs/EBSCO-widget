import { put, select, call } from 'redux-saga/effects';

import { showNotice } from '../../../lib/sagas/showNotice';
import retrieve from '../../../lib/sagas/retrieve';
import actions from '../../../lib/actions';
import * as fromState from '../../../lib/reducers';

describe('sagas showNotice', function () {
    let iterator;

    const action = {
        id: 'id',
        category: 'category'
    };

    beforeEach(function () {
        iterator = showNotice(action);
    });

    it('should select noticeById', function () {
        let next = iterator.next();
        assert.deepEqual(next.value, select(fromState.getNoticeById, action.id));
    });

    it('should end if a notice is returned', function () {
        iterator.next();
        let next = iterator.next('notice');
        assert.isTrue(next.done);
    });

    it('should select canUserRetrieve if no notice is returned', function () {
        iterator.next();
        let next = iterator.next(undefined);
        assert.deepEqual(next.value, select(fromState.canUserRetrieve));
    });

    it('should call retrieve if canUserRetrieve return true', function () {
        iterator.next();
        iterator.next(undefined);
        let next = iterator.next(true);
        assert.deepEqual(next.value, call(retrieve, action.id, action.category));
        next = iterator.next();
        assert.isTrue(next.done);
    });

    it('should select isUserLogged if canUserRetrieve return false', function () {
        iterator.next();
        iterator.next(undefined);
        let next = iterator.next(false);
        assert.deepEqual(next.value, select(fromState.isUserLogged));
    });

    it('should put actions.retrieveError if isUserLogger return true', function () {
        iterator.next();
        iterator.next(undefined);
        iterator.next(false);
        let next = iterator.next(true);
        assert.deepEqual(next.value, put(actions.retrieveError(action.category, action.id, { code: 401 })));
    });

    it('should put actions.pauseAction, retrieveCancel, showLogin if isUserLogger return false', function () {
        iterator.next();
        iterator.next(undefined);
        iterator.next(false);
        let next = iterator.next(false);
        assert.deepEqual(next.value, [
            put(actions.pauseAction(action)),
            put(actions.retrieveCancel(action.category, action.id)),
            put(actions.showLogin())
        ]);
    });

});
