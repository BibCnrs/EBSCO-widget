import { takeEvery } from 'redux-saga';
import _ from 'lodash';
import { put, select, fork, take, cancel } from 'redux-saga/effects';
import fetch from './fetch';

import * as fromState from '../reducers';
import actions, {
    RETRIEVE_LINK,
    FETCH_ERROR,
    FETCH_SUCCESS,
    SEARCH,
    LOGOUT
} from '../actions';


export function* retrieveLink(action) {

    yield put(actions.retrieveLinkPending());
    const request = yield select(fromState.getRetrieveLinkRequest, action.id);
    const task = yield fork(fetch, action, request);

    const nextAction = yield take((currentAction) => {
        switch(currentAction.type) {
        case SEARCH:
        case LOGOUT:
            return true;
        default: return _.isEqual(currentAction.action, action);
        }
    });

    if(nextAction.type === FETCH_ERROR) {
        return yield put(actions.retrieveLinkError(action.category, action.id, nextAction.error));
    }

    if(nextAction.type !== FETCH_SUCCESS) {
        return yield cancel(task);
    }
    yield put(actions.retrieveLinkSuccess(action.category, action.id, nextAction.response));
}

export default function* watchRetrieve() {
    yield takeEvery(RETRIEVE_LINK, retrieveLink);
}
