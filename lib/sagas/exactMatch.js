import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from './fetch';

import * as fromState from '../selectors';
import actions, { LOGOUT, SEARCH, RETRIEVE } from '../actions';

export function* exactMatch(action) {
    if (action.category !== 'article') {
        return;
    }

    const canSearch = yield select(fromState.canUserSearch);
    if (!canSearch) {
        return;
    }
    const canExactMatch = yield select(fromState.canExactMatch);
    if (!canExactMatch) {
        return;
    }

    const request = yield select(fromState.getExactMatchRequest);

    const { response, error, cancel } = yield call(fetch, request, [
        LOGOUT,
        RETRIEVE,
    ]);
    if (cancel) {
        return;
    }
    if (error) {
        return yield put(actions.exactMatchError(error));
    }
    yield put(actions.exactMatchSuccess(response));
}

function* watchExactMatch() {
    yield* takeLatest([SEARCH], exactMatch);
}

export default watchExactMatch;
