import { put, select } from 'redux-saga/effects';

import { exportNotice } from '../../../lib/sagas/exportNotice';
import { fromNotice } from '../../../lib/reducers';
import {
    EXPORT_NOTICE_PENDING,
    EXPORT_NOTICE_SUCCESS
} from '../../../lib/actions';

describe('sagas export notice', function () {
    let iterator;

    before(function () {
        iterator = exportNotice({ category: 'category', ids: [1, 2, 3] });
    });

    it('should trigger EXPORT_NOTICE_PENDING action', function () {
        const next = iterator.next();
        assert.deepEqual(next.value, put({
            type: EXPORT_NOTICE_PENDING,
            category: 'category'
        }));
    });

    it('should select missingNoticeIds', function () {
        const next = iterator.next();
        assert.deepEqual(next.value, select(fromNotice.getMissingNoticeIds, 'category', [1, 2, 3]));
    });

    it('should select notices by ids if no missing ids', function () {
        const missingIds = [];
        const next = iterator.next(missingIds);
        assert.deepEqual(next.value, select(fromNotice.getNoticesByIds, 'category', [1, 2, 3]));
    });

    it('should trigger EXPORT_NOTICE_SUCCESS with returned notices', function () {
        const notices = ['notice1', 'notice2', 'notice3'];
        const next = iterator.next(notices);
        assert.deepEqual(next.value, put({
            type: EXPORT_NOTICE_SUCCESS,
            category: 'category',
            notices
        }));
    });
});
