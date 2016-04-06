import 'es5-shim';
import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import EbscoWidget from './containers/EbscoWidget';

window.React = React;
window.ReactDom = ReactDom;
window.EbscoWidget = EbscoWidget;
if (__SERVER_URL__) {
    window.__SERVER_URL__ = __SERVER_URL__;
}
