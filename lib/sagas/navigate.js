import _ from 'lodash';
import { takeLatest } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

import actions, { NAVIGATE } from '../actions';
import * as fromState from '../selectors';

function* navigate({ location }) {
    if (location === 'database') {
        yield put(actions.retrieveDatabase());
        return;
    }

    const { previousQuery } = yield select(fromState.getCurrentSearch);

    const searchQuery = yield select(fromState.getSearchQuery);

    if (_.isEqual(previousQuery, searchQuery)) {
        return;
    }

    yield put(actions.search(location));
}

function* watchNavigate() {
    yield* takeLatest([NAVIGATE], navigate);
}

export default watchNavigate;
