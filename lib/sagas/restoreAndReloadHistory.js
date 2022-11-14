import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import actions, { RELOAD_HISTORY, RESTORE_HISTORY } from '../actions';

export function* restoreAndReloadHistory(action) {
    const domain = action.query.domain;
    const term = action.query.queries[0].term;

    yield put(actions.changeAllTerm(term));
    yield put(actions.changeAllSearchDomain(domain));
}

export default function* watchChangeAllTerm() {
    yield takeLatest(
        [RESTORE_HISTORY, RELOAD_HISTORY],
        restoreAndReloadHistory,
    );
}
