import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from './fetch';

import * as fromState from '../reducers';
import actions, {
    API_LOGIN
} from '../actions';

export function* apiLogin() {
    const request = yield select(fromState.getApiLoginRequest);
    const { response, error, cancel } = yield call(fetch, request);
    if(error) {
        return yield put(actions.loginError(error));
    }

    if(cancel) {
        return yield put(actions.loginCancel());
    }

    yield put(actions.loginSuccess(response));
}

function* watchSearch() {
    yield* takeLatest(API_LOGIN, apiLogin);
}

export default watchSearch;
