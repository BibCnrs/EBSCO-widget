import 'es5-shim';
import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import EbscoWidget from './containers/EbscoWidget';

if (__DEVELOPMENT__) {
    document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
            let rootElement = document.getElementById('ebsco-widget');
            if (!rootElement) {
                rootElement = document.createElement('div');
                rootElement.id = 'ebsco-widget';
                document.body.appendChild(rootElement);
            }

            ReactDom.render(
                <EbscoWidget url="http://localhost:3000/ebsco" />,
                rootElement
            );

        }
    };
} else {
    if (window.localStorage.getItem('VERSION') !== __VERSION__) {
        window.localStorage.clear();
        window.sessionStorage.clear();
        window.localStorage.setItem('VERSION', __VERSION__);
    }
    window.React = React;
    window.ReactDom = ReactDom;
    window.EbscoWidget = EbscoWidget;
}
