import { takeLatest } from 'redux-saga';
import { select, call } from 'redux-saga/effects';

import * as fromState from '../reducers';
import {
    RENATER_LOGIN
} from '../actions';

const goTo = (url) => window.location.href = url;

export function* renaterLogin() {
    const renaterLoginUrl = yield select(fromState.getRenaterLoginUrl);
    yield call(goTo, renaterLoginUrl);
}

function* watchSearch() {
    yield* takeLatest(RENATER_LOGIN, renaterLogin);
}

export default watchSearch;
