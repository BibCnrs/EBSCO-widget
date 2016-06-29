import { takeEvery } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';

import fetch from 'isomorphic-fetch';

import { fromNotice } from '../reducers';

import { EXPORT_NOTICE, EXPORT_NOTICE_SUCCESS } from '../actions';

export function* exportNotice(action) {
    const { ids, category } = action;

    yield put({
        type: 'EXPORT_NOTICE_PENDING',
        category
    });

    const missingIds = yield select(fromNotice.getMissingNoticeIds, category, ids);
    if(!missingIds.length) {
        const notices = yield select(fromNotice.getNoticesByIds, category, ids);
        yield put({
            type: EXPORT_NOTICE_SUCCESS,
            category,
            notices
        });
    }
}

function* watchExportNotice() {
    yield* takeEvery(EXPORT_NOTICE, exportNotice);
}

export default watchExportNotice;
