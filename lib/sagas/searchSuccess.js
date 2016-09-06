import { takeLatest } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from './fetch';

import * as fromState from '../reducers';
import actions, {
    SEARCH_SUCCESS,
    SEARCH,
    LOGOUT
} from '../actions';

const getMissingLinkIds = (response) => response.results
.reduce((ids, record, index) => {
    if(record.articleLinks && (record.articleLinks.fullTextLinks.length || record.articleLinks.pdfLinks.length)) {
        return ids;
    }

    return [
        ...ids,
        index + 1
    ];
}, []);

function* retrieve(id, category) {
    yield put(actions.retrievePending(category, id));
    const request = yield select(fromState.getRetrieveRequest, id);
    const { response, error, cancel } = yield call(fetch, request, [SEARCH, LOGOUT]);

    if(error) {
        return yield put(actions.retrieveError(category, id, error));
    }

    if(cancel) {
        return;
    }
    yield put(actions.retrieveSuccess(category, id, response));
}

export function* searchSuccess(action) {
    if (action.category !== 'article') {
        return;
    }

    const missingLinkIds = yield call(getMissingLinkIds, action.response);

    yield missingLinkIds.map(id => call(retrieve, id, 'article'));

}

function* watchSearchSuccess() {
    yield* takeLatest([
        SEARCH_SUCCESS
    ], searchSuccess);
}

export default watchSearchSuccess;
