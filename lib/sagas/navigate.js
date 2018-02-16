import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions, { NAVIGATE } from '../actions';

function* navigate({ location }) {
    if (location !== 'database') {
        return;
    }
    yield put(actions.retrieveDatabase());
}

function* watchNavigate() {
    yield* takeLatest([NAVIGATE], navigate);
}

export default watchNavigate;
