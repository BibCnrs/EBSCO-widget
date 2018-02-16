import { call, take, race, put } from 'redux-saga/effects';
import fetch from '../services/fetch';
import actions, { DISCONNECTED } from '../actions';

export default function* handleFetch(
    request,
    interruptingActions = [],
    disconnectOn401 = true,
) {
    try {
        const { fetchResult, cancel } = yield race({
            fetchResult: call(fetch, request),
            cancel: take([].concat(interruptingActions).concat(DISCONNECTED)),
        });

        if (cancel) {
            return { cancel };
        }

        if (
            disconnectOn401 &&
            fetchResult.error &&
            fetchResult.error.code === 401
        ) {
            yield put(actions.logout());
            yield put(actions.disconnected());
            return { cancel: true };
        }

        return fetchResult;
    } catch (error) {
        return { error };
    }
}
