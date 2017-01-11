import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

import fetch from './fetch';
import * as fromState from '../selectors';
import actions, {
    RETRIEVE_DATABASE,
} from '../actions';


export function* retrieveDatabase(action) {
    const request = yield select(fromState.getRetrieveDatabaseRequest, action.id);
    const { response, error, cancel } = yield call(fetch, request);

    if(error) {
        return yield put(actions.retrieveDatabaseError(error));
    }

    if(cancel) {
        return;
    }
    yield put(actions.retrieveDatabaseSuccess(response));
}

export default function* watchRetrieve() {
    yield takeEvery(RETRIEVE_DATABASE, retrieveDatabase);
}
