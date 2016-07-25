import { takeEvery } from 'redux-saga';
import _ from 'lodash';
import { put, select, fork, take, cancel } from 'redux-saga/effects';
import fetch from './fetch';

import * as fromState from '../reducers';
import actions, {
    SHOW_NOTICE,
    FETCH_ERROR,
    FETCH_SUCCESS,
    SEARCH,
    LOGOUT
} from '../actions';


export function* retrieve(action) {
    const notice = yield select(fromState.getNoticeById, action.id);
    if(notice) {
        return;
    }
    const canRetrieve = yield select(fromState.canUserRetrieve);
    if(!canRetrieve) {
        const isUserLogged = yield select(fromState.isUserLogged);
        if(! isUserLogged) {
            return yield put(actions.pauseAction(action));
        }

        yield put(actions.retrieveError(action.category, action.id, { code: 401 }));
    }

    yield put(actions.retrievePending());
    const request = yield select(fromState.getRetrieveRequest, action.id);
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
        return yield put(actions.retrieveError(action.category, action.id, nextAction.error));
    }

    if(nextAction.type !== FETCH_SUCCESS) {
        return yield cancel(task);
    }
    yield put(actions.retrieveSuccess(action.category, action.id, nextAction.response));
}

export default function* watchRetrieve() {
    yield takeEvery(SHOW_NOTICE, retrieve);
}
