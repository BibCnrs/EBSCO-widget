import { fork } from 'redux-saga/effects';

import exportNotice from './exportNotice';
import batchRetrieve from './batchRetrieve';
import search from './search';
import loadPage from './loadPage';

export default function* sagas (getState) {
    yield fork(exportNotice, getState);
    yield fork(batchRetrieve, getState);
    yield fork(search, getState);
    yield fork(loadPage, getState);
}
