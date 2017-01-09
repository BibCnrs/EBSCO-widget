import { takeLatest } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';

import * as fromState from '../selectors';
import actions, {
    NAVIGATE
} from '../actions';
import { delay } from '../services/sagaUtils';

function* navigate({ location }) {
    if (location !== 'database') {
        return;
    }
    yield put(actions.retrieveDatabase());
}

function* watchNavigate() {
    yield* takeLatest([
        NAVIGATE
    ], navigate);
}

export default watchNavigate;
