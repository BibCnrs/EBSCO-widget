import { takeEvery } from 'redux-saga';
import { select, put, call } from 'redux-saga/effects';

import { sessionStorage } from '../services/storage';
import actions, { LOGIN_SUCCESS } from '../actions';
import * as fromState from '../selectors';

export function* loginSuccess({ response }) {
    const { username, domains, favorite_domain } = response;
    yield call(sessionStorage.setItem, 'EBSCO_WIDGET_username', username);
    yield call(sessionStorage.setItem, 'EBSCO_WIDGET_availableDomains', domains);
    yield call(sessionStorage.setItem, 'EBSCO_WIDGET_domain', favorite_domain || domains[0]);

    if(!domains.length) {
        return yield put(actions.noDomainError());
    }

    const domainsToChange = yield select(fromState.getDomainToChangeOnLogin);
    yield put(actions.changeDomain(domainsToChange, favorite_domain || domains[0]));

    const domainSetFromUrl = yield select(fromState.hasDomainSetFromUrl);
    if (domainSetFromUrl) {
        const location = yield select(fromState.getLocation);
        yield put(actions.changeDomain(location, domainSetFromUrl));
    }

    const canPersistHistoryOnServer = yield select(fromState.canPersistHistoryOnServer);
    if (canPersistHistoryOnServer) {
        yield put(actions.loadHistoryPage());
    }

    const pausedAction = yield select(fromState.getPausedAction);
    if(!pausedAction) {
        return;
    }
    yield put(pausedAction);
}

export default function* watchLoginSuccess() {
    yield takeEvery([LOGIN_SUCCESS], loginSuccess);
}
