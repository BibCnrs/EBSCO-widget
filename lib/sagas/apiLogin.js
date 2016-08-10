import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from './fetch';

import * as fromState from '../reducers';
import actions, {
    API_LOGIN
} from '../actions';
import { sessionStorage } from '../services/storage';

export function* apiLogin() {
    const request = yield select(fromState.getApiLoginRequest);
    const { response, error, cancel } = yield call(fetch, request);
    if(error) {
        return yield put(actions.apiLoginError(error));
    }

    if(cancel) {
        return;
    }

    yield put(actions.apiLoginSuccess(response));
    yield call(sessionStorage.setItem, 'EBSCO_WIDGET_username', response.username);
    yield call(sessionStorage.setItem, 'EBSCO_WIDGET_availableDomains', response.domains);
    yield call(sessionStorage.setItem, 'EBSCO_WIDGET_domain', response.domains[0]);

    const pausedAction = yield select(fromState.getPausedAction);
    if(pausedAction) {
        yield put(pausedAction);
    }
}

function* watchSearch() {
    yield* takeLatest(API_LOGIN, apiLogin);
}

export default watchSearch;
