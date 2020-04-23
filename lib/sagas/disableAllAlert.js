import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import actions, { DISABLE_ALL_ALERT } from '../actions';
import * as fromState from '../selectors';
import fetch from './fetch';

export function* handleDisableAllAlert() {
    const request = yield select(fromState.getApiDisableAllAlertRequest);
    const { error } = yield call(fetch, request);
    if (error) {
        yield put(actions.fetchError(error));
    }
    yield put(actions.loadHistoryPage());
}

export default function*() {
    yield takeEvery(DISABLE_ALL_ALERT, handleDisableAllAlert);
}
