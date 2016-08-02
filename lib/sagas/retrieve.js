import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import fetch from './fetch';

import * as fromState from '../reducers';
import actions, {
    SHOW_NOTICE,
    SEARCH,
    LOGOUT
} from '../actions';


export function* retrieve(action) {
    const notice = yield select(fromState.getNoticeById, action.id);
    if(notice) {
        return;
    }
    const canRetrieve = yield select(fromState.canUserRetrieve);
    if(!canRetrieve) {
        const isUserLogged = yield select(fromState.isUserLogged);
        if(! isUserLogged) {
            yield put(actions.pauseAction(action));
            yield put(actions.retrieveCancel(action.category, action.id));
            return yield put(actions.showLogin());
        }

        yield put(actions.retrieveError(action.category, action.id, { code: 401 }));
    }

    yield put(actions.retrievePending(action.category, action.id));
    const request = yield select(fromState.getRetrieveRequest, action.id);
    const { response, error, cancel } = yield call(fetch, request, [SEARCH, LOGOUT]);

    if(error) {
        return yield put(actions.retrieveError(action.category, action.id, error));
    }

    if(cancel) {
        return;
    }
    yield put(actions.retrieveSuccess(action.category, action.id, response));
}

export default function* watchRetrieve() {
    yield takeEvery(SHOW_NOTICE, retrieve);
}
