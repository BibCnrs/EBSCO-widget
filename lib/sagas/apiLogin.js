import { takeLatest } from 'redux-saga';
import { put, select, take, fork, cancel, call } from 'redux-saga/effects';
import fetch from './fetch';
import _ from 'lodash';

import * as fromState from '../reducers';
import actions, {
    API_LOGIN,
    FETCH_ERROR,
    FETCH_SUCCESS
} from '../actions';
import { sessionStorage } from '../services/storage';

function* apiLogin(action) {
    const request = yield select(fromState.getApiLoginRequest, action.data);
    const task = yield fork(fetch, action, request);

    const nextAction = yield take((currentAction) => {
        return _.isEqual(currentAction.action, action);
    });

    if(nextAction.type === FETCH_ERROR) {
        return yield put(actions.searchError(action.category, nextAction.error));
    }

    if(nextAction.type !== FETCH_SUCCESS) {
        return yield cancel(task);
    }

    yield put(actions.apiLoginSuccess(nextAction.response));
    yield call(sessionStorage.setItem, 'EBSCO_WIDGET_username', nextAction.response.username);
    yield call(sessionStorage.setItem, 'EBSCO_WIDGET_availableDomains', nextAction.response.domains);
    yield call(sessionStorage.setItem, 'EBSCO_WIDGET_domain', nextAction.response.domains[0]);

    const pausedAction = yield select(fromState.getPausedAction);
    if(pausedAction) {
        yield put(pausedAction);
    }
}

function* watchSearch() {
    yield* takeLatest(API_LOGIN, apiLogin);
}

export default watchSearch;
