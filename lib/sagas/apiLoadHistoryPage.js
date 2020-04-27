import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from './fetch';

import * as fromState from '../selectors';
import actions, { API_LOAD_HISTORY_PAGE } from '../actions';

export function* apiLoadHistoryPage({ page = 1, limit = 5, has_alert }) {
    const request = yield select(fromState.getApiLoadHistoryRequest);
    yield put(actions.loadHistoryPagePending());

    // get all search
    const { response: allHistory, error, cancel } = yield call(
        fetch,
        {
            ...request,
            url: `${request.url}?limit=${limit}&offset=${(page - 1) * 5}`,
        },
        [],
        false,
    );

    let allAlert = [];
    if (has_alert === true) {
        // get all alert
        ({ response: allAlert } = yield call(
            fetch,
            {
                ...request,
                url: `${request.url}?limit=${limit}&offset=${(page - 1) *
                    5}${`&has_alert=true`}`,
            },
            [],
            false,
        ));
    }

    if (error) {
        return yield put(actions.loadHistoryPageError(error));
    }

    if (cancel) {
        return yield put(actions.loadHistoryPageCancel());
    }

    yield put(actions.loadHistoryPageSuccess([allHistory, allAlert], page));
}

function* watchApiLoadHistoryPage() {
    yield* takeLatest(API_LOAD_HISTORY_PAGE, apiLoadHistoryPage);
}

export default watchApiLoadHistoryPage;
