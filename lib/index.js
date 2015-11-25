'use strict';

import 'es5-shim';
import 'babel-core/polyfill';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import getStore from './store';

class EbscoWidget extends Component {
    render() {
        const { token, url, term } = this.props;

        if (token) {
            window.localStorage.setItem('token', token);
        }

        if (__DEVELOPMENT__) {
            var { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
        }

        const store = getStore(url, token, term);
        const providedApp = <Provider store={store}><App term={term} /></Provider>;

        return __DEVELOPMENT__ ?
            <div>
                {providedApp}
                <DebugPanel top right bottom>
                    <DevTools store={store} monitor={LogMonitor} />
                </DebugPanel>
            </div>
        :
            providedApp;
    }
}

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
                <EbscoWidget url="http://localhost:3000/api" />,
                rootElement
            );

        }
    };
} else {
    window.React = React;
    window.EbscoWidget = EbscoWidget;
}
