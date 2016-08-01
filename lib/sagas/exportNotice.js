import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { put, select, call, take, cancel } from 'redux-saga/effects';

import * as fromState from '../reducers';
import fetch from './fetch';

import actions, {
    EXPORT_NOTICE,
    SEARCH,
    LOGOUT
} from '../actions';

export const openExport = (notices) => {
    const fakeLink = document.createElement('a');
    document.body.appendChild(fakeLink);

    fakeLink.setAttribute('href', 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(JSON.stringify(notices)));
    fakeLink.setAttribute('download', 'notices.json');
    fakeLink.click();
    fakeLink.remove();
};

export function* exportNotice(action) {
    const { ids } = action;


    const canRetrieve = yield select(fromState.canUserRetrieve);
    if(!canRetrieve) {
        const isUserLogged = yield select(fromState.isUserLogged);
        if(! isUserLogged) {
            yield put(actions.pauseAction(action));
            return yield put(actions.showLogin());
        }

        yield put(actions.batchRetrieveError({ code: 401 }));
    }

    yield put(actions.exportNoticePending(ids));

    const missingIds = yield select(fromState.getMissingNoticeIds, ids);
    if(!missingIds.length) {
        const notices = yield select(fromState.getNoticesByIds, ids);
        // @TODO convert to RIS format or retrieve it
        yield call(openExport, notices);
        return;
    }

    const request = yield select(fromState.getBatchRetrieveRequest, missingIds);

    const { response, error, cancel } = yield call(fetch, request, [SEARCH, LOGOUT]);

    if(error) {
        return yield put(actions.retrieveError(action.category, action.id, error));
    }

    if(cancel) {
        return;
    }

    yield put(actions.batchRetrieveSuccess(response));

    const notices = yield select(fromState.getNoticesByIds, ids);
    // @TODO convert to RIS format or retrieve it

    yield call(openExport, notices);
}

function* watchExportNotice() {
    yield* takeEvery(EXPORT_NOTICE, exportNotice);
}

export default watchExportNotice;
