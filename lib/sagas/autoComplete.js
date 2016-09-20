import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import fetch from './fetch';
import actions, {
    CHANGE_TERM,
    SEARCH
} from '../actions';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const parseAutoComplete = (response) => JSON.parse(response).terms.map(({ fragments }) => fragments[1].text);

export function* loadPage(action) {
    if(!action.term) {
        return;
    }
    yield call(delay, 500);
    const { response, error, cancel } = yield call(fetch, {
        url: `https://widgets.ebscohost.com/prod/simplekey/autocomplete/autocomp.php?q=${action.term.replace(/\s/, '%2B')}`
    }, [CHANGE_TERM, SEARCH]);
    if(error || cancel || response === '') {
        window.console.error(error);
        return;
    }
    try {
        const terms = yield call(parseAutoComplete, response);
        yield put(actions.suggestTerms(action.category, terms, action.index));
    } catch (error) {
        window.console.error(error);
    }
}

export default function* watchLoadPage() {
    yield takeLatest([
        CHANGE_TERM,
        SEARCH
    ], loadPage);
}
