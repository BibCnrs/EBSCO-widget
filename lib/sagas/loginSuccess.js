import { takeEvery } from 'redux-saga';
import { select, put, call } from 'redux-saga/effects';

import { sessionStorage } from '../services/storage';
import { LOGIN_SUCCESS } from '../actions';
import * as fromState from '../selectors';

export function* loginSuccess({ response }) {

    const { username, domains } = response;
    yield call(sessionStorage.setItem, 'EBSCO_WIDGET_username', username);
    yield call(sessionStorage.setItem, 'EBSCO_WIDGET_availableDomains', domains);
    yield call(sessionStorage.setItem, 'EBSCO_WIDGET_domain', domains[0]);
    const pausedAction = yield select(fromState.getPausedAction);
    if(!pausedAction) {
        return;
    }
    yield put(pausedAction);
}

export default function* watchLoginSuccess() {
    yield takeEvery([LOGIN_SUCCESS], loginSuccess);
}
