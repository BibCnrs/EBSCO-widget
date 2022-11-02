import { takeLatest } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import actions, { CHANGE_ALL_SEARCH_DOMAIN } from '../actions';
import * as fromState from '../selectors';

export function* changeAllSearchDomain(action) {
    yield put(actions.changeDomain('article', action.domain));
    yield put(actions.changeDomain('publication', action.domain));
    yield put(actions.changeDomain('database', action.domain));

    const currentLocation = yield select(fromState.getLocation);
    if (currentLocation !== 'article' && currentLocation !== 'publication') {
        return;
    }
    yield put(actions.search(currentLocation));
}

export default function* watchChangeAllTerm() {
    yield takeLatest([CHANGE_ALL_SEARCH_DOMAIN], changeAllSearchDomain);
}
