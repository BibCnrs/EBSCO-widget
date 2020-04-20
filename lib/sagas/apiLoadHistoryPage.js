import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from './fetch';

import * as fromState from '../selectors';
import actions, { API_LOAD_HISTORY_PAGE } from '../actions';

export function* apiLoadHistoryPage({ page = 1, limit = 5, has_alert }) {
    const request = yield select(fromState.getApiLoadHistoryRequest);
    yield put(actions.loadHistoryPagePending());

    if (has_alert === true) {
        page = 1;
    }

    const { response, error, cancel } = yield call(
        fetch,
        {
            ...request,
            url: `${request.url}?limit=${limit}&offset=${(page - 1) * 5}${
                has_alert ? `&has_alert=true` : ''
            }`,
        },
        [],
        false,
    );

    if (error) {
        return yield put(actions.loadHistoryPageError(error));
    }

    if (cancel) {
        return yield put(actions.loadHistoryPageCancel());
    }

    yield put(actions.loadHistoryPageSuccess(response, page));
}

function* watchApiLoadHistoryPage() {
    yield* takeLatest(API_LOAD_HISTORY_PAGE, apiLoadHistoryPage);
}

export default watchApiLoadHistoryPage;
