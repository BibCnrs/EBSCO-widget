import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from '../services/fetch';

import * as fromState from '../reducers';

import actions, { BATCH_RETRIEVE, BATCH_RETRIEVE_PENDING, BATCH_RETRIEVE_SUCCESS, BATCH_RETRIEVE_ERROR } from '../actions';

export function* batchRetrieve(action) {
    const { ids } = action;
    const isUserLogged = yield select(fromState.isUserLogged);

    if(!isUserLogged) {
        return put(actions.pauseAction(action));
    }

    yield put({
        type: BATCH_RETRIEVE_PENDING
    });

    const request = yield select(fromState.getBatchRetrieveRequest, ids);

    try {
        const response = yield call(fetch, request);

        yield put({
            type: BATCH_RETRIEVE_SUCCESS,
            category: 'article',
            response
        });

    } catch(error) {
        if (error.stack.match('Failed to fetch')) {
            error.code = 'failedFetch';
        }
        return yield put({
            type: BATCH_RETRIEVE_ERROR,
            error
        });
    }


}

function* watchExportNotice() {
    yield* takeEvery(BATCH_RETRIEVE, batchRetrieve);
}

export default watchExportNotice;
