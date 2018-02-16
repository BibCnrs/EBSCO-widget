import { put, select, call } from 'redux-saga/effects';

import fetch from './fetch';
import * as fromState from '../selectors';
import actions, { SEARCH, LOGOUT } from '../actions';

export default function* retrieve(id, category) {
    yield put(actions.retrievePending(category, id));
    const request = yield select(fromState.getRetrieveRequest, id);
    const { response, error, cancel } = yield call(fetch, request, [
        SEARCH,
        LOGOUT,
    ]);

    if (error) {
        return yield put(actions.retrieveError(category, id, error));
    }

    if (cancel) {
        return yield put(actions.retrieveCancel(category, id));
    }
    yield put(actions.retrieveSuccess(category, id, response));
}
