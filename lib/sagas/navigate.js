import { takeLatest } from 'redux-saga';
import { call, select } from 'redux-saga/effects';

import * as fromState from '../reducers';
import {
    NAVIGATE
} from '../actions';
import { goTo, delay } from '../services/sagaUtils';

function* navigate({ location }) {
    if (location !== 'db') {
        return;
    }

    yield delay(100); //wait for the store to get saved
    const dbUrl = yield select(fromState.getDbUrl);
    yield call(goTo, dbUrl);
}

function* watchNavigate() {
    yield* takeLatest([
        NAVIGATE
    ], navigate);
}

export default watchNavigate;
