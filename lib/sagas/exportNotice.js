import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

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

    fakeLink.setAttribute('href', 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(notices));
    fakeLink.setAttribute('download', 'notices.ris');
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

    const risLinksRequest = yield select(fromState.getRisRequestForIds, ids);
    const { response, error, cancel } = yield call(fetch, risLinksRequest, [SEARCH, LOGOUT]);

    if (cancel) {
        return;
    }

    if (error) {
        return yield put(actions.exportNoticeError(action.category, error));
    }
    yield call(openExport, response.join(''));
}

function* watchExportNotice() {
    yield* takeEvery(EXPORT_NOTICE, exportNotice);
}

export default watchExportNotice;
