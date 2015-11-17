'use strict';

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import store from './store';

class EbscoWidget extends Component {
    render() {
        const { token, url, term } = this.props;

        return (
            <Provider store={store}>
                <App url={url} term={term} token={token}/>
            </Provider>
        );
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

            const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
            ReactDom.render(
                <div>
                    <EbscoWidget url="http://localhost:3000/api" />
                    <DebugPanel top right bottom>
                        <DevTools store={store} monitor={LogMonitor} />
                    </DebugPanel>
                </div>,
                rootElement
            );
        }
    };
} else {
    window.React = React;
    window.EbscoWidget = EbscoWidget;
}
