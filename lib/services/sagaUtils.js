import { call } from 'redux-saga/effects';

export const goTo = url => (window.location.href = url);

export const delay = ms =>
    call(ms => new Promise(resolve => setTimeout(() => resolve(true), ms)), ms);
