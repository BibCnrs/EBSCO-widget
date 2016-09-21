import { takeLatest } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';

import * as fromState from '../selectors';
import actions, {
    NAVIGATE
} from '../actions';
import { goTo, delay } from '../services/sagaUtils';

function* navigate({ location }) {
    if (location !== 'db') {
        return;
    }
    yield put(actions.setFullScreen(false));
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
