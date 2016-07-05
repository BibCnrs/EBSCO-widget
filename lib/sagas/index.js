import { fork } from 'redux-saga/effects';

import exportNotice from './exportNotice';
import batchRetrieve from './batchRetrieve';

export default function* sagas (getState) {
    yield fork(exportNotice, getState);
    yield fork(batchRetrieve, getState);
}
