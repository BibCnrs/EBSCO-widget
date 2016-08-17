import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

import * as fromState from '../reducers';
import actions, {
    RENATER_LOGIN
} from '../actions';

const goTo = (url) => window.location.href = url;
const delay = (ms) => new Promise(resolve => setTimeout(() => resolve(true), ms));

export function* renaterLogin() {
    yield put(actions.loginPending());
    const renaterLoginUrl = yield select(fromState.getRenaterLoginUrl);
    yield delay(100); //wait for the store to get saved
    yield call(goTo, renaterLoginUrl);
}

function* watchRenaterLogin() {
    yield* takeLatest(RENATER_LOGIN, renaterLogin);
}

export default watchRenaterLogin;
