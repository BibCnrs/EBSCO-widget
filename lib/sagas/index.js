import { fork } from 'redux-saga/effects';

import initialize from './initialize';
import exportNotice from './exportNotice';
import search from './search';
import loadPage from './loadPage';
import showNotice from './showNotice';
import retrieveLink from './retrieveLink';
import apiLogin from './apiLogin';
import history from './history';
import logout from './logout';
import renaterLogin from './renaterLogin';
import loginSuccess from './loginSuccess';
import navigate from './navigate';
import searchSuccess from './searchSuccess';
import autoComplete from './autoComplete';
import exactMatch from './exactMatch';

export default function* sagas (getState) {
    yield fork(initialize, getState);
    yield fork(exportNotice, getState);
    yield fork(search, getState);
    yield fork(loadPage, getState);
    yield fork(showNotice, getState);
    yield fork(retrieveLink, getState);
    yield fork(apiLogin, getState);
    yield fork(history, getState);
    yield fork(logout, getState);
    yield fork(renaterLogin, getState);
    yield fork(loginSuccess, getState);
    yield fork(navigate, getState);
    yield fork(searchSuccess, getState);
    yield fork(autoComplete, getState);
    yield fork(exactMatch, getState);
}
