import { put, select } from 'redux-saga/effects';

import * as fromState from '../selectors';
import actions from '../actions';

export default function* updateDomain() {
    const initialDomains = yield select(fromState.getInitialDomains);
    if(initialDomains.article) {
        yield put(actions.changeDomain('article', initialDomains.article));
    }
    if(initialDomains.publication) {
        yield put(actions.changeDomain('publication', initialDomains.publication));
    }
    if(initialDomains.database) {
        yield put(actions.changeDomain('database', initialDomains.database));
    }
}
