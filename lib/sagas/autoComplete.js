import { takeLatest } from 'redux-saga';
import { call } from 'redux-saga/effects';

import fetch from './fetch';
import actions, { CHANGE_TERM } from '../actions';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function* loadPage(action) {
    yield call(delay, 500);
    console.log(action);
    const { response, error, cancel } = yield call(fetch, { url: `https://widgets.ebscohost.com/prod/simplekey/autocomplete/autocomp.php?q=${action.term}`}, [CHANGE_TERM]);
    console.log({ response, error, cancel });
}

export default function* watchLoadPage() {
    yield takeLatest(CHANGE_TERM, loadPage);
}
