'use strict';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import store from './store';

class EbscoWidget extends Component {
    render() {
        return (
            <Provider store={store}>
                {() => <App url={this.props.url} term={this.props.term}/>}
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
            React.render(
                <div>
                    <EbscoWidget url="http://localhost:3000" term="aids"/>
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
