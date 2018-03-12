import { call } from 'redux-saga/effects';

export const goTo = url => (window.location.href = url);

const delayFn = ms =>
    new Promise(resolve => setTimeout(() => resolve(true), ms));

export const delay = ms => call(delayFn, ms);
