import { takeLatest } from 'redux-saga';
import { put, select, take, fork, cancel } from 'redux-saga/effects';
import fetch from './fetch';
import _ from 'lodash';

import * as fromState from '../reducers';
import actions, {
    LOGOUT,
    FETCH_SUCCESS,
    FETCH_ERROR,
    SEARCH,
    RETRIEVE,
    CHANGE_RESULTS_PER_PAGE,
    CHANGE_SORT,
    RELOAD_HISTORY,
    LINKED_SEARCH
} from '../actions';

function* search(action) {
    const canSearch = yield select(fromState.canUserSearch);
    if(!canSearch) {
        const isUserLogged = yield select(fromState.isUserLogged);
        if(!isUserLogged) {
            yield put(actions.pauseAction(action));
            return yield put(actions.showLogin());
        }
        return yield put(actions.forbidAccess(action.category));
    }

    yield put(actions.loading());
    const searchQuery = yield select(fromState.getSearchQuery);
    const request = yield select(fromState.getSearchRequest);
    const task = yield fork(fetch, action, request);

    const nextAction = yield take((currentAction) => {
        switch(currentAction.type) {
        case RETRIEVE:
        case LOGOUT:
            return true;
        default: return _.isEqual(currentAction.action, action);
        }
    });

    if(nextAction.type === FETCH_ERROR) {
        return yield put(actions.searchError(action.category, nextAction.error));
    }

    if(nextAction.type !== FETCH_SUCCESS) {
        return yield cancel(task);
    }

    yield put(actions.searchSuccess(action.category, nextAction.response, searchQuery));
    yield put(actions.loaded());
}

function* watchSearch() {
    yield* takeLatest([
        SEARCH,
        CHANGE_RESULTS_PER_PAGE,
        CHANGE_SORT,
        RELOAD_HISTORY,
        LINKED_SEARCH
    ], search);
}

export default watchSearch;
