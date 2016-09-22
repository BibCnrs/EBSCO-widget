import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

import fetch from './fetch';
import * as fromState from '../selectors';
import actions, {
    RETRIEVE_LINK,
    SEARCH,
    LOGOUT
} from '../actions';


export function* retrieveLink(action) {

    yield put(actions.retrieveLinkPending());
    const request = yield select(fromState.getRetrieveLinkRequest, action.id);
    const { response, error, cancel } = yield call(fetch, request, [SEARCH, LOGOUT]);

    if(error) {
        return yield put(actions.retrieveLinkError(action.category, action.id, error));
    }

    if(cancel) {
        return;
    }
    yield put(actions.retrieveLinkSuccess(action.category, action.id, response));
}

export default function* watchRetrieve() {
    yield takeEvery(RETRIEVE_LINK, retrieveLink);
}
