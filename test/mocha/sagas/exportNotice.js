import { put, select, call } from 'redux-saga/effects';

import { exportNotice, openExport } from '../../../lib/sagas/exportNotice';
import * as fromState from '../../../lib/reducers';
import actions,  {
    EXPORT_NOTICE_PENDING
} from '../../../lib/actions';

describe('sagas export notice', function () {
    let iterator;
    let action = { category: 'category', ids: [1, 2, 3] };
    beforeEach(function () {
        iterator = exportNotice(action);
    });

    it('should select isUserLogged', function () {
        const next = iterator.next();
        assert.deepEqual(next.value, select(fromState.isUserLogged));
    });

    it('should trigger EXPORT_NOTICE_PENDING action if user isLogged', function () {
        iterator.next();
        const next = iterator.next(true);
        assert.deepEqual(next.value, put({
            type: EXPORT_NOTICE_PENDING,
            category: action.category
        }));
    });

    it('should trigger pauseAction with current action and end if user is not logged', function () {
        iterator.next();
        const next = iterator.next(false);
        assert.deepEqual(next.value, put(actions.pauseAction(action)));
        assert.isTrue(next.done);
    });

    it('should select missingNoticeIds', function () {
        iterator.next();
        iterator.next(true);
        const next = iterator.next();
        assert.deepEqual(next.value, select(fromState.getMissingNoticeIds, action.ids));
    });

    it('should select notices by ids if no missing ids', function () {
        const missingIds = [];
        iterator.next();
        iterator.next(true);
        iterator.next();
        const next = iterator.next(missingIds);
        assert.deepEqual(next.value, select(fromState.getNoticesByIds, action.ids));
    });

    it('should trigger BATCH_RETRIEVE with missing ids if there are some', function () {
        const missingIds = [1];
        iterator.next();
        iterator.next(true);
        iterator.next();
        const next = iterator.next(missingIds);
        assert.deepEqual(next.value, put(actions.batchRetrieve(missingIds)));

        // assert.isTrue(next.done);
    });

    it('should call openExport with returned notices', function () {
        const notices = ['notice1', 'notice2', 'notice3'];
        iterator.next();
        iterator.next(true);
        iterator.next();
        iterator.next([]);
        const next = iterator.next(notices);
        assert.deepEqual(next.value, call(openExport, notices));
    });
});
