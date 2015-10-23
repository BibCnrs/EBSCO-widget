'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import store from './store';

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        let rootElement = document.getElementById('ebsco-widget');
        if (!rootElement) {
            rootElement = document.createElement('div');
            rootElement.id = 'ebsco-widget';
            document.body.appendChild(rootElement);
        }

        React.render(
            <Provider store={store}>
                {() => <App/>}
            </Provider>,
            rootElement
        );

        if (__DEVELOPMENT__) {
            const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
            React.render(
                // The child must be wrapped in a function
                // to work around an issue in React 0.13.
                <div>
                    <Provider store={store}>
                        {() => <App/>}
                    </Provider>
                    <DebugPanel top right bottom>
                        <DevTools store={store} monitor={LogMonitor} />
                    </DebugPanel>
                </div>,
                rootElement
            );
        }
    }
};
