import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

import actions, { ADD_FAVOURITE_RESOURCE } from '../actions';
import * as fromState from '../selectors';
import fetch from './fetch';
import { delay } from '../services/sagaUtils';

export function* handleAddFavouriteResources() {
    const request = yield select(
        fromState.getApiUpdateFavoriteResourcesRequest,
    );
    const { error } = yield call(fetch, request);
    if (error) {
        yield put(actions.fetchError(error));
        return;
    }

    yield put(actions.startAnimateProfile());
    yield delay(1000);
    yield put(actions.stopAnimateProfile());
}

export default function* addFavouriteResources() {
    yield takeEvery(ADD_FAVOURITE_RESOURCE, handleAddFavouriteResources);
}
