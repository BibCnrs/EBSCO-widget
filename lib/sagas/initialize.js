import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

import fetch from './fetch';
import { localStorage, sessionStorage } from '../services/storage';
import * as fromState from '../selectors';
import actions, { INITIALIZE } from '../actions';
import { retrieveDatabase } from './retrieveDatabase';
import updateDomain from './updateDomain';

export function* initializeAllDomains() {
    let domains = yield select(fromState.getAllDomains);
    if (domains.length > 0) {
        return;
    }
    const domainsRequest = yield select(fromState.getDomainsRequest);
    const { response, error } = yield call(fetch, domainsRequest);
    if (error) {
        yield put(actions.fetchDomainError(error));
        return;
    }
    domains = response;
    yield call(sessionStorage.setItem, 'EBSCO_WIDGET_allDomains', domains);
    yield put(actions.setAllDomains(domains));
}

export function* retrieveLoginData() {
    const getLoginRequest = yield select(fromState.getGetLoginRequest);
    const { response, error } = yield call(fetch, getLoginRequest);
    if (error) {
        if (error.message.match('Unauthorized')) {
            return yield put(actions.loginCancel());
        }
        return yield put(actions.loginError(error));
    }
    if (response) {
        yield put(actions.loginSuccess(response));
    }
}

export function* initialize() {
    const history = yield call(localStorage.getItem, 'EBSCO_WIDGET_history');
    if (history) {
        yield put(actions.setHistory(history));
    }

    const allDomains = yield select(fromState.getAllDomains);
    if (allDomains.length === 0) {
        yield call(initializeAllDomains);
    }

    yield call(updateDomain);

    const isLoggingWithRenater = yield select(fromState.isLoggingWithRenater);
    if (isLoggingWithRenater) {
        return yield call(retrieveLoginData);
    }

    const isUserLogged = yield select(fromState.isUserLogged);
    const canPersistHistoryOnServer = yield select(
        fromState.canPersistHistoryOnServer,
    );
    if (isUserLogged && canPersistHistoryOnServer) {
        yield put(actions.loadHistoryPage());
    }

    const currentLocation = yield select(fromState.getLocation);

    yield put(actions.showResult(false));
    if (currentLocation === 'database') {
        yield call(retrieveDatabase);
    }
}

export default function* watchInitialize() {
    yield takeEvery(INITIALIZE, initialize);
}
