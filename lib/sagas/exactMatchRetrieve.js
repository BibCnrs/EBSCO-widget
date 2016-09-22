import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from './fetch';

import * as fromState from '../selectors';
import actions, {
    LOGOUT,
    SEARCH,
    SHOW_EXACT_MATCH_NOTICE
} from '../actions';

export function* exactMatchRetrieve() {
    const notice = yield select(fromState.getExactMatchNotice);
    if (notice) {
        return;
    }
    const request = yield select(fromState.getExactMatchRetrieveRequest);

    const { response, error, cancel } = yield call(fetch, request, [LOGOUT, SEARCH]);
    if (cancel) {
        return;
    }
    if (error) {
        yield put(actions.exactMatchRetrieveError(error));
    }
    yield put(actions.exactMatchRetrieveSuccess(response));
}

function* watchExactMatch() {
    yield* takeLatest([
        SHOW_EXACT_MATCH_NOTICE
    ], exactMatchRetrieve);
}

export default watchExactMatch;
