import { takeEvery } from 'redux-saga';
import { call } from 'redux-saga/effects';

import { sessionStorage } from '../services/storage';
import { LOGOUT } from '../actions';

export function* logout() {
    yield call(sessionStorage.removeItem, 'EBSCO_WIDGET_username');
    yield call(sessionStorage.removeItem, 'EBSCO_WIDGET_domain');
    yield call(sessionStorage.removeItem, 'EBSCO_WIDGET_availableDomains');
}

export default function* watchLogout() {
    yield takeEvery([LOGOUT], logout);
}
