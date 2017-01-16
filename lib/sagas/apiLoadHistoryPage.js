import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from './fetch';

import * as fromState from '../selectors';
import actions, {
    API_LOAD_HISTORY_PAGE
} from '../actions';

export function* apiLoadHistoryPage({ page = 1 }) {
    const request = yield select(fromState.getApiLoadHistoryRequest);
    yield put(actions.loadHistoryPagePending());

    const { response, error, cancel } = yield call(fetch, {
        ...request,
        url: `${request.url}?limit=5&offset=${(page - 1) * 5}`,
    }, [], false);

    if(error) {
        return yield put(actions.loadHistoryPageError(error));
    }

    if(cancel) {
        return yield put(actions.loadHistoryPageCancel());
    }

    yield put(actions.loadHistoryPageSuccess(response, page));
}

function* watchApiLoadHistoryPage() {
    yield* takeLatest(API_LOAD_HISTORY_PAGE, apiLoadHistoryPage);
}

export default watchApiLoadHistoryPage;