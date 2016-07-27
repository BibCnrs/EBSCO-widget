import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

import * as fromState from '../reducers';
import actions, { REQUEST_NAVIGATION } from '../actions';

export function* navigate(action) {
    if(action.location !== 'article') {
        return yield put(actions.navigate(action.location));
    }
    const isUserLogged = yield select(fromState.isUserLogged);
    if(isUserLogged) {
        return yield put(actions.navigate(action.location));
    }
    yield put(actions.pauseAction(action));

    return yield put(actions.showLogin());
}

export default function* watchLoadPage() {
    yield takeEvery(REQUEST_NAVIGATION, navigate);
}
