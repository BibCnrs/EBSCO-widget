import { takeLatest } from 'redux-saga';
import { call } from 'redux-saga/effects';

import retrieve from './retrieve';
import {
    SEARCH_SUCCESS
} from '../actions';

export const getMissingLinkIds = (response) => response.results
.reduce((ids, record, index) => {
    if(record.articleLinks && (record.articleLinks.fullTextLinks.length || record.articleLinks.pdfLinks.length)) {
        return ids;
    }

    return [
        ...ids,
        index + 1
    ];
}, []);

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
