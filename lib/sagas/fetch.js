import { put, call, cancelled } from 'redux-saga/effects';
import fetch from '../services/fetch';

import actions from '../actions';

export default function* handleFetch (action, request) {
    try {
        const response = yield call(fetch, request);
        yield put(actions.fetchSuccess(action, response));
    } catch (error) {
        yield put(actions.fetchError(action, error));
    } finally {
        if (yield cancelled()) {
            yield put(actions.fetchCancel(action));
        }
    }
}
