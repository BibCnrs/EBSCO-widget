import { put, select } from 'redux-saga/effects';

import { exportNotice } from '../../../lib/sagas/exportNotice';
import { fromNotice, fromLogin } from '../../../lib/reducers';
import {
    EXPORT_NOTICE_PENDING,
    EXPORT_NOTICE_SUCCESS
} from '../../../lib/actions';

describe.only('sagas export notice', function () {
    let iterator;
    beforeEach(function () {
        iterator = exportNotice({ category: 'category', ids: [1, 2, 3] });
    });

    it('should select isUserLogged', function () {
        const next = iterator.next();
        assert.deepEqual(next.value, select(fromLogin.isUserLogged));
    });

    it('should trigger EXPORT_NOTICE_PENDING action if user isLogged', function () {
        iterator.next();
        const next = iterator.next(true);
        assert.deepEqual(next.value, put({
            type: EXPORT_NOTICE_PENDING,
            category: 'category'
        }));
    });

    it('should end if user is not logged', function () {
        iterator.next();
        const next = iterator.next(false);
        assert.isTrue(next.done);
    });

    it('should select missingNoticeIds', function () {
        iterator.next();
        iterator.next(true);
        const next = iterator.next();
        assert.deepEqual(next.value, select(fromNotice.getMissingNoticeIds, 'category', [1, 2, 3]));
    });

    it('should select notices by ids if no missing ids', function () {
        const missingIds = [];
        iterator.next();
        iterator.next(true);
        iterator.next();
        const next = iterator.next(missingIds);
        assert.deepEqual(next.value, select(fromNotice.getNoticesByIds, 'category', [1, 2, 3]));
    });

    it('should end if missing ids', function () {
        const missingIds = [1];
        iterator.next();
        iterator.next(true);
        iterator.next();
        const next = iterator.next(missingIds);
        assert.isTrue(next.done);
    });

    it('should trigger EXPORT_NOTICE_SUCCESS with returned notices', function () {
        const notices = ['notice1', 'notice2', 'notice3'];
        iterator.next();
        iterator.next(true);
        iterator.next();
        iterator.next([]);
        const next = iterator.next(notices);
        assert.deepEqual(next.value, put({
            type: EXPORT_NOTICE_SUCCESS,
            category: 'category',
            notices
        }));
    });
});
