import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from './fetch';

import { sessionStorage } from '../services/storage';
import * as fromState from '../selectors';
import actions, { LOGOUT } from '../actions';

export function* logout() {
    const request = yield select(fromState.getApiLogoutRequest);
    const { error } = yield call(fetch, request, [], false);
    if (error) {
        return yield put(actions.logoutError(error));
    }

    yield call(sessionStorage.removeItem, 'EBSCO_WIDGET_username');
    yield call(sessionStorage.removeItem, 'EBSCO_WIDGET_domain');
    yield call(sessionStorage.removeItem, 'EBSCO_WIDGET_availableDomains');
}

export default function* watchLogout() {
    yield takeEvery([LOGOUT], logout);
}
