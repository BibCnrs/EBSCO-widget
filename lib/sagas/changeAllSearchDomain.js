import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import actions, { CHANGE_ALL_SEARCH_DOMAIN } from '../actions';

export function* changeAllSearchDomain(action) {
    yield put(actions.changeDomain('article', action.domain));
    yield put(actions.changeDomain('publication', action.domain));
}

export default function* watchChangeAllTerm() {
    yield takeLatest([CHANGE_ALL_SEARCH_DOMAIN], changeAllSearchDomain);
}
