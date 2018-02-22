import { takeEvery } from 'redux-saga';
import { call } from 'redux-saga/effects';

import {
    SEARCH_SUCCESS,
    CLICK_DB,
    SHOW_PROFILE,
    LOGIN_SUCCESS,
} from '../actions';
import {
    trackSearch,
    trackDbClick,
    trackShowProfile,
    trackLogin,
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
    yield takeEvery(LOGIN_SUCCESS, function*({ response: { origin } }) {
        yield call(trackLogin, origin || 'inist');
    });
}
