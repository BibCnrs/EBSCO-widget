import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from './fetch';

import * as fromState from '../reducers';
import actions, {
    LOGOUT,
    SEARCH,
    LIMIT_SEARCH,
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

    yield put(actions.searchPending(action.category));
    yield put(actions.loading());
    const searchQuery = yield select(fromState.getSearchQuery);
    const request = yield select(fromState.getSearchRequest);
    const { response, error, cancel } = yield call(fetch, request, [RETRIEVE, LOGOUT]);

    if(error) {
        yield put(actions.loaded());
        return yield put(actions.searchError(action.category, error));
    }

    if(cancel) {
        yield put(actions.loaded());
        return;
    }

    yield put(actions.searchSuccess(action.category, response, searchQuery));
    yield put(actions.loaded());
}

function* watchSearch() {
    yield* takeLatest([
        SEARCH,
        LIMIT_SEARCH,
        CHANGE_RESULTS_PER_PAGE,
        CHANGE_SORT,
        RELOAD_HISTORY,
        LINKED_SEARCH
    ], search);
}

export default watchSearch;
