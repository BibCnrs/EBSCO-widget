import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

import actions, {
    ADD_FAVOURITE_RESOURCE,
    REMOVE_FAVOURITE_RESOURCE,
    MOVE_FAVOURITE_RESOURCE,
} from '../actions';
import * as fromState from '../selectors';
import fetch from './fetch';
import { delay } from '../services/sagaUtils';

export function* handleSaveFavouriteResources({ type }) {
    const request = yield select(
        fromState.getApiUpdateFavoriteResourcesRequest,
    );
    const { error } = yield call(fetch, request);
    if (error) {
        yield put(actions.fetchError(error));
        return;
    }

    if (type !== ADD_FAVOURITE_RESOURCE) {
        return;
    }

    yield put(actions.startAnimateProfile());
    yield delay(1000);
    yield put(actions.stopAnimateProfile());
}

export default function* addFavouriteResources() {
    yield takeLatest(
        [
            ADD_FAVOURITE_RESOURCE,
            REMOVE_FAVOURITE_RESOURCE,
            MOVE_FAVOURITE_RESOURCE,
        ],
        handleSaveFavouriteResources,
    );
}
