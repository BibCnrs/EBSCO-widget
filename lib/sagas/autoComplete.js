import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { delay } from '../services/sagaUtils';

import fetch from './fetch';
import actions, {
    CHANGE_TERM,
    SEARCH,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
} from '../actions';

export const parseAutoComplete = (response) => JSON.parse(response).terms.map(({ fragments }) => fragments[1].text);

export function* autoComplete(action) {
    if(!action.term) {
        return;
    }
    yield call(delay, 100);
    const { response, error, cancel } = yield call(fetch, {
        url: `https://widgets.ebscohost.com/prod/simplekey/autocomplete/autocomp.php?q=${action.term.replace(/\s/, '%2B')}`
    }, [CHANGE_TERM, SEARCH, SEARCH_PENDING, SEARCH_SUCCESS], false);
    if(cancel || response === '') {
        return;
    }
    if(error) {
        yield call(window.console.error, error);
        return;
    }
    try {
        const terms = yield call(parseAutoComplete, response);
        yield put(actions.suggestTerms(action.category, terms, action.index));
    } catch (error) {
        yield call(window.console.error, error);
    }
}

export default function* watchLoadPage() {
    yield takeLatest([
        CHANGE_TERM
    ], autoComplete);
}
