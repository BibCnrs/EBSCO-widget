import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import actions, { DELETE_HISTORIES } from '../actions';

export function* deleteHistories() {
    yield put(actions.deleteHistoriesFromServer());
}

export default function* watchDeleteHistories() {
    yield takeLatest(DELETE_HISTORIES, deleteHistories);
}
