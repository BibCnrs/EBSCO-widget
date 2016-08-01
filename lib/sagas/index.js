import { fork } from 'redux-saga/effects';

import initialize from './initialize';
import exportNotice from './exportNotice';
import search from './search';
import loadPage from './loadPage';
import retrieve from './retrieve';
import retrieveLink from './retrieveLink';
import apiLogin from './apiLogin';
import navigate from './navigate';
import history from './history';
import logout from './logout';


export default function* sagas (getState) {
    yield fork(initialize, getState);
    yield fork(exportNotice, getState);
    yield fork(search, getState);
    yield fork(loadPage, getState);
    yield fork(retrieve, getState);
    yield fork(retrieveLink, getState);
    yield fork(apiLogin, getState);
    yield fork(navigate, getState);
    yield fork(history, getState);
    yield fork(logout, getState);
}
