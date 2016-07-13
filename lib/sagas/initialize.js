import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

import fetch from '../services/fetch';
import { localStorage, sessionStorage } from '../services/storage';
import * as fromState from '../reducers';
import actions, { INITIALIZE } from '../actions';

export function* initialization({ url, domain, dbUrl }) {
    const isUserLogged = yield select(fromState.isUserLogged);
    if(!isUserLogged) {
        yield put(actions.setUrl(url));
        const getLoginRequest = yield select(fromState.getGetLoginRequest);
        try {
            const { token } = yield call(fetch, getLoginRequest);
            yield put(actions.setToken(token));
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
    yield put(actions.setUrl(url));
    if(dbUrl) {
        yield put(actions.setDbUrl(dbUrl));
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

    const history = localStorage.getItem('EBSCO_WIDGET_history');
    if (history) {
        yield put(actions.setHistory(history));
    }
}

export default function* watchLoadPage() {
    yield takeEvery(INITIALIZE, initialization);
}
