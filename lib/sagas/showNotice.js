import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

import * as fromState from '../reducers';
import actions, {
    SHOW_NOTICE
} from '../actions';
import retrieve from './retrieve';


export function* showNotice(action) {
    const { id, category } = action;
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

    yield call(retrieve, id, category);
}

export default function* watchShowNotice() {
    yield takeEvery(SHOW_NOTICE, showNotice);
}
