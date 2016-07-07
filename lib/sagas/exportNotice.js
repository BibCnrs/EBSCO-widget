import { takeEvery } from 'redux-saga';
import { put, select, call, take } from 'redux-saga/effects';
import * as fromState from '../reducers';

import actions, { BATCH_RETRIEVE_SUCCESS, BATCH_RETRIEVE_ERROR, EXPORT_NOTICE, EXPORT_NOTICE_PENDING } from '../actions';

export const openExport = (notices) => {
    const fakeLink = document.createElement('a');
    document.body.appendChild(fakeLink);

    fakeLink.setAttribute('href', 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(JSON.stringify(notices)));
    fakeLink.setAttribute('download', 'notices.json');
    fakeLink.click();
    fakeLink.remove();
};

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
        // @TODO convert to RIS format or retrieve it
        yield call(openExport, notices);
        return;
    }

    yield put(actions.batchRetrieve(missingIds));

    const retrieveResult = yield take([BATCH_RETRIEVE_SUCCESS, BATCH_RETRIEVE_ERROR]);
    if(retrieveResult.type === BATCH_RETRIEVE_ERROR) {
        return;
    }

    const notices = yield select(fromState.getNoticesByIds, ids);
    // @TODO convert to RIS format or retrieve it

    yield call(openExport, notices);
}

function* watchExportNotice() {
    yield* takeEvery(EXPORT_NOTICE, exportNotice);
}

export default watchExportNotice;
