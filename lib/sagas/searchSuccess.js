import { takeLatest } from 'redux-saga';
import { call, select } from 'redux-saga/effects';

import retrieve from './retrieve';
import {
    SEARCH_SUCCESS
} from '../actions';
import * as fromState from '../reducers';

export function* searchSuccess(action) {
    if (action.category !== 'article') {
        return;
    }

    const missingLinkIds = yield select(fromState.getRecordIdsWithMissingLink);
    yield missingLinkIds.map(id => call(retrieve, id, 'article'));
}

function* watchSearchSuccess() {
    yield* takeLatest([
        SEARCH_SUCCESS
    ], searchSuccess);
}

export default watchSearchSuccess;
