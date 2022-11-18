import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { delay } from '../services/sagaUtils';
import * as fromState from '../selectors';

import fetch from './fetch';
import actions, {
    CHANGE_ALL_TERM,
    SEARCH,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
} from '../actions';

export const parseAutoComplete = response =>
    JSON.parse(response)
        .terms.map(({ fragments }) => fragments[1] && fragments[1].text)
        .filter(v => !!v);

export function* autoComplete(action) {
    if (!action.term) {
        return;
    }
    yield delay(100);
    const { response, error, cancel } = yield call(
        fetch,
        {
            url: `https://widgets.ebscohost.com/prod/simplekey/autocomplete/autocomp.php?q=${action.term.replace(
                /\s/,
                '%2B',
            )}`,
        },
        [CHANGE_ALL_TERM, SEARCH, SEARCH_PENDING, SEARCH_SUCCESS],
        false,
    );
    if (cancel || (!error && !response)) {
        return;
    }
    if (error) {
        yield call(window.console.error, error);
        return;
    }
    try {
        const currentLocation = yield select(fromState.getLocation);
        const terms = yield call(parseAutoComplete, response);
        yield put(actions.suggestTerms(currentLocation, terms, action.index));
    } catch (error) {
        yield call(window.console.error, error);
    }
}

export default function* watchLoadPage() {
    yield takeLatest([CHANGE_ALL_TERM], autoComplete);
}
