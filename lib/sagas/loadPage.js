import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

import * as fromState from '../selectors';
import actions, { PAGE_LOAD } from '../actions';

export function* loadPage(action) {
    const page = yield select(fromState.getCurrentPageData);
    if(!page) {
        yield put(actions.triggerSearch(action.category));
    }
}

export default function* watchLoadPage() {
    yield takeEvery(PAGE_LOAD, loadPage);
}
