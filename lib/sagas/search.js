import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from './fetch';

import * as fromState from '../reducers';
import actions, {
    LOGOUT,
    SEARCH,
    TRIGGER_SEARCH,
    LIMIT_SEARCH,
    RETRIEVE,
    CHANGE_RESULTS_PER_PAGE,
    CHANGE_SORT,
    RELOAD_HISTORY,
    LINKED_SEARCH,
    CLEAR_FACET
} from '../actions';

export function* search(action) {
    const canSearch = yield select(fromState.canUserSearch);
    if(!canSearch) {
        const isUserLogged = yield select(fromState.isUserLogged);
        if(!isUserLogged) {
            yield put(actions.pauseAction(action));
            return yield put(actions.showLogin());
        }
        return yield put(actions.forbidAccess(action.category));
    }

    const isQueryReady = yield select(fromState.isQueryReady);
    if(!isQueryReady) {
        return;
    }

    yield put(actions.searchPending(action.category));
    const searchQuery = yield select(fromState.getSearchQuery);
    const request = yield select(fromState.getSearchRequest);
    const { response, error, cancel } = yield call(fetch, request, [RETRIEVE, LOGOUT]);

    if(cancel) {
        return yield put(actions.searchCancel(action.category));
    }

    if(error) {
        return yield put(actions.searchError(action.category, error));
    }

    yield put(actions.searchSuccess(action.category, response, searchQuery));
}

function* watchSearch() {
    yield* takeLatest([
        SEARCH,
        TRIGGER_SEARCH,
        LIMIT_SEARCH,
        CHANGE_RESULTS_PER_PAGE,
        CHANGE_SORT,
        RELOAD_HISTORY,
        LINKED_SEARCH,
        CLEAR_FACET
    ], search);
}

export default watchSearch;
