import { takeEvery } from 'redux-saga';
import { call } from 'redux-saga/effects';

import { SEARCH_SUCCESS, CLICK_DB } from '../actions';
import { trackSearch } from '../services/piwikTracker';

export default function* piwikTracking() {
    yield takeEvery(SEARCH_SUCCESS, function*({ category, query: { domain } }) {
        yield call(trackSearch, 'search', category, domain);
    });
    yield takeEvery(CLICK_DB, function*({ category, domain }) {
        yield call(trackSearch, 'search', category, domain);
    });
}
