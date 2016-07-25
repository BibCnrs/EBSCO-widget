import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

import fetch from '../services/fetch';
import { localStorage, sessionStorage } from '../services/storage';
import * as fromState from '../reducers';
import actions, { INITIALIZE } from '../actions';

export function* initialization({ domain }) {
    const isUserLogged = yield select(fromState.isUserLogged);
    if(!isUserLogged) {
        const getLoginRequest = yield select(fromState.getGetLoginRequest);
        try {
            const { token, username, domains } = yield call(fetch, getLoginRequest);
            yield put(actions.setToken(token));
            yield call(sessionStorage.setItem, 'EBSCO_WIDGET_username', username);
            yield call(sessionStorage.setItem, 'EBSCO_WIDGET_availableDomains', domains);
            yield call(sessionStorage.setItem, 'EBSCO_WIDGET_domain', domains[0]);
        } catch (error) {
            if(error.message !== 'Unauthorized') {
                throw error;
            }
        }
    }
    const isInitialized = yield select(fromState.isInitialized);
    if(isInitialized) {
        return;
    }
    let domains = yield call(sessionStorage.getItem, 'EBSCO_WIDGET_allDomains');
    if(!domains) {
        const domainsRequest = yield select(fromState.getDomainsRequest);
        domains = yield call(fetch, domainsRequest);
        yield call(sessionStorage.setItem, 'EBSCO_WIDGET_allDomains', domains);
    }
    yield put(actions.setAllDomains(domains));
    if (domain) {
        yield put(actions.changeDomain('article', domain));
        yield put(actions.changeDomain('publication', domain));
        yield put(actions.changeDomain('a2z', domain));
    }

    const history = yield call(localStorage.getItem, 'EBSCO_WIDGET_history');
    if (history) {
        yield put(actions.setHistory(history));
    }
}

export default function* watchLoadPage() {
    yield takeEvery(INITIALIZE, initialization);
}
