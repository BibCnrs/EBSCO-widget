import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from './fetch';

import * as fromState from '../reducers';
import actions, {
    LOGOUT,
    SEARCH,
    RETRIEVE
} from '../actions';

export function* exactMatch(action) {
    const canSearch = yield select(fromState.canUserSearch);
    if(!canSearch) {
        return;
    }
    if(action.category !== 'article') {
        return;
    }

    const request = yield select(fromState.getExactMatchRequest);

    const { response, error, cancel } = yield call(fetch, request, [LOGOUT, RETRIEVE]);
    if (cancel) {
        return;
    }
    if (error) {
        yield put(actions.exactMatchError(error));
    }
    yield put(actions.exactMatchSuccess(response));
}

function* watchExactMatch() {
    yield* takeLatest([
        SEARCH
    ], exactMatch);
}

export default watchExactMatch;
