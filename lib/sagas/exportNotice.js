import { formatToExtension } from '../config/article';
import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

import * as fromState from '../selectors';
import fetch from './fetch';

import actions, { EXPORT_NOTICE, SEARCH, LOGOUT } from '../actions';

export const openExport = (notices, format) => {
    if (navigator && navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(
            new Blob([notices], {
                type: 'text/html',
            }),
            `notice.${formatToExtension[format]}`,
        );
        return;
    }
    const fakeLink = document.createElement('a');
    document.body.appendChild(fakeLink);

    fakeLink.setAttribute(
        'href',
        'data:application/octet-stream;charset=utf-8,' +
            encodeURIComponent(notices),
    );
    fakeLink.setAttribute('download', `notices.${formatToExtension[format]}`);
    fakeLink.click();
    fakeLink.remove();
};

export function* exportNotice(action) {
    const { ids, format } = action;

    const canRetrieve = yield select(fromState.canUserRetrieve);
    if (!canRetrieve) {
        const isUserLogged = yield select(fromState.isUserLogged);
        if (!isUserLogged) {
            yield put(actions.pauseAction(action));
            return yield put(actions.showLogin());
        }

        yield put(actions.batchRetrieveError({ code: 401 }));
    }

    yield put(actions.exportNoticePending(ids));

    const exportLinksRequest = yield select(fromState.getExportRequestForIds, {
        format,
        ids,
    });
    const { response, error, cancel } = yield call(
        fetch,
        exportLinksRequest,
        [SEARCH, LOGOUT],
        false,
    );

    if (cancel) {
        return;
    }

    if (error) {
        return yield put(actions.exportNoticeError(action.category, error));
    }
    yield call(openExport, response.join('\n'), format);
    yield put(actions.exportNoticeSuccess());
}

function* watchExportNotice() {
    yield* takeEvery(EXPORT_NOTICE, exportNotice);
}

export default watchExportNotice;
