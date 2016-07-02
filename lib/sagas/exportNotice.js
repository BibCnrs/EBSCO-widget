import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

import * as fromState from '../reducers';

import actions, { EXPORT_NOTICE, EXPORT_NOTICE_SUCCESS, EXPORT_NOTICE_PENDING } from '../actions';

export function* exportNotice(action) {
    const { ids, category } = action;

    const isUserLogged = yield select(fromState.isUserLogged);

    if(!isUserLogged) {
        return put(actions.pauseAction(action));
    }

    yield put({
        type: EXPORT_NOTICE_PENDING,
        category
    });

    const missingIds = yield select(fromState.getMissingNoticeIds, ids);
    if(!missingIds.length) {
        const notices = yield select(fromState.getNoticesByIds, ids);
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
