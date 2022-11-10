import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

import fetch from './fetch';
import * as fromState from '../selectors';
import actions, {
    LOGOUT,
    A2Z_SEARCH,
    SEARCH,
    TRIGGER_SEARCH,
    LIMIT_SEARCH,
    RETRIEVE,
    CHANGE_RESULTS_PER_PAGE,
    CHANGE_SORT,
    RELOAD_HISTORY,
    LINKED_SEARCH,
    CLEAR_FACET,
    EXACT_MATCH_SEARCH,
} from '../actions';

export function* search(action) {
    const isQueryReady = yield select(fromState.isQueryReady);
    if (!isQueryReady) {
        return;
    }
    yield put(actions.searchPending(action.category));
    const searchQuery = yield select(fromState.getSearchQuery);
    const request =
        action.category === 'metadore'
            ? yield select(fromState.getMetadoreSearchRequest)
            : yield select(fromState.getSearchRequest);
    const { response, error, cancel } = yield call(fetch, request, [
        RETRIEVE,
        LOGOUT,
    ]);

    if (cancel) {
        return yield put(actions.searchCancel(action.category));
    }

    if (error) {
        return yield put(actions.searchError(action.category, error));
    }

    yield put(actions.searchSuccess(action.category, response, searchQuery));
}

function* watchSearch() {
    yield* takeLatest(
        [
            SEARCH,
            A2Z_SEARCH,
            TRIGGER_SEARCH,
            LIMIT_SEARCH,
            CHANGE_RESULTS_PER_PAGE,
            CHANGE_SORT,
            RELOAD_HISTORY,
            LINKED_SEARCH,
            CLEAR_FACET,
            EXACT_MATCH_SEARCH,
        ],
        search,
    );
}

export default watchSearch;
