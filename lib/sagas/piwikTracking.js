import { takeEvery } from 'redux-saga';
import { call } from 'redux-saga/effects';

import { SEARCH_SUCCESS, CLICK_DB, SHOW_PROFILE } from '../actions';
import {
    trackSearch,
    trackDbClick,
    trackShowProfile,
} from '../services/piwikTracker';

export default function* piwikTracking() {
    yield takeEvery(SEARCH_SUCCESS, function*({ category, query: { domain } }) {
        yield call(trackSearch, 'search', category, domain);
    });
    yield takeEvery(CLICK_DB, function*({ category, domain }) {
        yield call(trackDbClick, 'search', category, domain);
    });
    yield takeEvery(SHOW_PROFILE, function*() {
        yield call(trackShowProfile);
    });
}
