import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import actions, { CHANGE_ALL_TERM } from '../actions';

export function* changeAllTerm(action) {
    yield put(actions.changeTerm('article', action.term, action.index));
    yield put(actions.changeTerm('publication', action.term, action.index));
    yield put(actions.changeTerm('metadore', action.term, action.index));
}

export default function* watchChangeAllTerm() {
    yield takeLatest([CHANGE_ALL_TERM], changeAllTerm);
}
