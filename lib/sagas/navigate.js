import _ from 'lodash';
import { takeLatest } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

import actions, { NAVIGATE } from '../actions';
import * as fromState from '../selectors';

export function* navigate({ location }) {
    if (location === 'license') {
        return;
    }
    if (location === 'database') {
        yield put(actions.retrieveDatabase());
        return;
    }

    const { previousQuery } = yield select(fromState.getCurrentSearch);

    const searchQuery = yield select(fromState.getSearchQuery);

    if (!searchQuery.queries[0].term || _.isEqual(previousQuery, searchQuery)) {
        return;
    }

    yield put(actions.search(location));
}

function* watchNavigate() {
    yield* takeLatest([NAVIGATE], navigate);
}

export default watchNavigate;
