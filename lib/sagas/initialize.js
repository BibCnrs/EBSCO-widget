import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

import fetch from './fetch';
import { localStorage, sessionStorage } from '../services/storage';
import * as fromState from '../reducers';
import actions, { INITIALIZE } from '../actions';

export function* initializeAllDomains() {
    let domains = yield call(sessionStorage.getItem, 'EBSCO_WIDGET_allDomains');
    if(!domains) {
        const domainsRequest = yield select(fromState.getDomainsRequest);
        const { response, error } = yield call(fetch, domainsRequest);
        if(error) {
            window.console.error(error);
            return;
        }
        domains = response;
        yield call(sessionStorage.setItem, 'EBSCO_WIDGET_allDomains', domains);
    }
    yield put(actions.setAllDomains(domains));
}

export function* initializeLogin() {
    const getLoginRequest = yield select(fromState.getGetLoginRequest);
    const { response, error } = yield call(fetch, getLoginRequest);
    if (error && error.message !== 'Unauthorized') {
        throw error;
    }
    if(response) {
        yield put(actions.apiLoginSuccess(response));

        const { username, domains } = response;
        yield call(sessionStorage.setItem, 'EBSCO_WIDGET_username', username);
        yield call(sessionStorage.setItem, 'EBSCO_WIDGET_availableDomains', domains);
        yield call(sessionStorage.setItem, 'EBSCO_WIDGET_domain', domains[0]);
        const pausedAction = yield select(fromState.getPausedAction);
        yield put(pausedAction);
    }
}

export function* initialize({ domain }) {
    const isUserLogged = yield select(fromState.isUserLogged);
    if(!isUserLogged) {
        yield call(initializeLogin);
    }

    const history = yield call(localStorage.getItem, 'EBSCO_WIDGET_history');
    if (history) {
        yield put(actions.setHistory(history));
    }

    const allDomains = yield select(fromState.getAllDomains);
    if(allDomains.length === 0) {
        yield call(initializeAllDomains);
    }

    if (domain) {
        yield put(actions.changeDomain('article', domain));
        yield put(actions.changeDomain('publication', domain));
        yield put(actions.changeDomain('a2z', domain));
    }
}

export default function* watchInitialize() {
    yield takeEvery(INITIALIZE, initialize);
}
