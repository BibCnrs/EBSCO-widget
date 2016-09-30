import { call, take, race, put } from 'redux-saga/effects';
import fetch from '../services/fetch';
import actions, { DISCONNECTED } from '../actions';

export default function* handleFetch (request, interruptingActions = []) {
    try {
        const {
            fetchResult,
            cancel
        } = yield race({
            fetchResult: call(fetch, request),
            cancel: take([...interruptingActions, DISCONNECTED])
        });

        if (cancel) {
            return { cancel };
        }

        if (fetchResult.error && fetchResult.error.code === 401) {
            yield put(actions.logout());
            return yield put(actions.disconnected());
        }

        return fetchResult;
    } catch (error) {
        return { error };
    }
}
