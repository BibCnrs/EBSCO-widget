import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

import fetch from './fetch';
import { localStorage, sessionStorage } from '../services/storage';
import * as fromState from '../reducers';
import actions, { INITIALIZE } from '../actions';

export function* initializeAllDomains() {
    let domains = yield select(fromState.getAllDomains);
    if(domains.length > 0) {
        return;
    }
    const domainsRequest = yield select(fromState.getDomainsRequest);
    const { response, error } = yield call(fetch, domainsRequest);
    if(error) {
        window.console.error(error);
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
        if(error.message.match('Unauthorized')) {
            return yield put(actions.loginCancel());
        }
        return yield put(actions.loginError(error));
    }
    if(response) {
        yield put(actions.loginSuccess(response));
    }
}

export function* updateDomain() {
    const domainToUpdate = yield select(fromState.getDomainToUpdate);
    if(domainToUpdate.article) {
        yield put(actions.changeDomain('article', domainToUpdate.article));
    }
    if(domainToUpdate.publication) {
        yield put(actions.changeDomain('publication', domainToUpdate.publication));
    }
}

export function* initialize() {
    const history = yield call(localStorage.getItem, 'EBSCO_WIDGET_history');
    if (history) {
        yield put(actions.setHistory(history));
    }

    const allDomains = yield select(fromState.getAllDomains);
    if(allDomains.length === 0) {
        yield call(initializeAllDomains);
    }

    yield call(updateDomain);

    const isLoggingWithRenater = yield select(fromState.isLoggingWithRenater);
    if(isLoggingWithRenater) {
        return yield call(retrieveLoginData);
    }

    yield put(actions.showResult(false));
}

export default function* watchInitialize() {
    yield takeEvery(INITIALIZE, initialize);
}
