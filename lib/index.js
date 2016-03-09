import 'es5-shim';
import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import EbscoWidget from './containers/EbscoWidget';

if (window.localStorage.getItem('VERSION') !== __VERSION__) {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('VERSION', __VERSION__);
}
window.React = React;
window.ReactDom = ReactDom;
window.EbscoWidget = EbscoWidget;
if (__SERVER_URL__) {
    window.__SERVER_URL__ = __SERVER_URL__;
}
