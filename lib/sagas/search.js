import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from '../services/fetch';

import * as fromState from '../reducers';
import actions, { SEARCH, SEARCH_SUCCESS, CHANGE_RESULTS_PER_PAGE, CHANGE_SORT, RELOAD_HISTORY, LINKED_SEARCH } from '../actions';

function* search(action) {
    const isUserLogged = yield select(fromState.isUserLogged);

    if(!isUserLogged) {
        return put(actions.pauseAction(action));
    }
    const isDomainAvailable = yield select(fromState.isDomainAvailable);
    if (!isDomainAvailable) {
        return put(actions.forbidAccess(action.category));
    }
    yield put(actions.loading());
    const searchRequest = yield select(fromState.getSearchRequest);
    try {
        const response = yield call(fetch, searchRequest);
        yield put({
            type: SEARCH_SUCCESS,
            category: action.category,
            response
        });
    } catch(error) {
        yield put(actions.searchError(error));
    }
    yield put(actions.loaded());
}

function* watchSearch() {
    yield* takeEvery([
        SEARCH,
        CHANGE_RESULTS_PER_PAGE,
        CHANGE_SORT,
        RELOAD_HISTORY,
        LINKED_SEARCH
    ], search);
}

export default watchSearch;
