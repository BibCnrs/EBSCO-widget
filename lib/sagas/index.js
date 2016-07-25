import { fork } from 'redux-saga/effects';

import initialize from './initialize';
import exportNotice from './exportNotice';
import batchRetrieve from './batchRetrieve';
import search from './search';
import loadPage from './loadPage';
import retrieve from './retrieve';
import apiLogin from './apiLogin';

export default function* sagas (getState) {
    yield fork(initialize, getState);
    yield fork(exportNotice, getState);
    yield fork(batchRetrieve, getState);
    yield fork(search, getState);
    yield fork(loadPage, getState);
    yield fork(retrieve, getState);
    yield fork(apiLogin, getState);
}
