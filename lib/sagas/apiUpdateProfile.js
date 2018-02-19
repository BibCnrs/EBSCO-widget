import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from './fetch';

import * as fromState from '../selectors';
import actions, { API_UPDATE_PROFILE } from '../actions';

export function* apiUpdateProfile() {
    const request = yield select(fromState.getApiUpdateProfileRequest);
    yield put(actions.updateProfilePending());

    const { response, error, cancel } = yield call(fetch, request, [], false);

    if (error) {
        return yield put(actions.updateProfileError(error));
    }

    if (cancel) {
        return yield put(actions.updateProfileCancel());
    }

    yield put(actions.updateProfileSuccess(response));
}

function* watchApiUpdateProfile() {
    yield* takeLatest(API_UPDATE_PROFILE, apiUpdateProfile);
}

export default watchApiUpdateProfile;
