import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

import * as fromState from '../reducers';
import actions, {
    RENATER_LOGIN
} from '../actions';

const goTo = (url) => window.location.href = url;

export function* renaterLogin() {
    yield put(actions.loginPending(true));
    const renaterLoginUrl = yield select(fromState.getRenaterLoginUrl);
    yield call(goTo, renaterLoginUrl);
}

function* watchRenaterLogin() {
    yield* takeLatest(RENATER_LOGIN, renaterLogin);
}

export default watchRenaterLogin;
