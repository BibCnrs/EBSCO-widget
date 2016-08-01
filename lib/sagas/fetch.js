import { call, take, race } from 'redux-saga/effects';
import fetch from '../services/fetch';

export default function* handleFetch (request, interruptingActions = []) {
    try {
        const {
            fetchResult,
            cancel
        } = yield race({
            fetchResult: call(fetch, request),
            cancel: take(interruptingActions)
        });

        if (cancel) {
            return { cancel };
        }

        return fetchResult;
    } catch (error) {
        return { error };
    }
}
