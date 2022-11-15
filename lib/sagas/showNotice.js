import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

import * as fromState from '../selectors';
import actions, { SHOW_NOTICE } from '../actions';
import retrieve from './retrieve';

export function* showNotice(action) {
    const { id, category } = action;
    const notice = yield select(fromState.getNoticeById, action.id);
    if (notice) {
        return;
    }

    // TODO temporary fix for testing

    // const canRetrieve = yield select(fromState.canUserRetrieve);
    // if (canRetrieve) {
    //     return yield call(retrieve, id, category);
    // }

    return yield call(retrieve, id, category);

    // const isUserLogged = yield select(fromState.isUserLogged);
    // if (isUserLogged) {
    //     return yield put(
    //         actions.retrieveError(action.category, action.id, {
    //             code: 'RETRIEVE_ERROR_401',
    //         }),
    //     );
    // }

    // return yield [
    //     put(actions.pauseAction(action)),
    //     put(actions.retrieveCancel(action.category, action.id)),
    //     put(actions.showLogin()),
    // ];
}

export default function* watchShowNotice() {
    yield takeEvery(SHOW_NOTICE, showNotice);
}
