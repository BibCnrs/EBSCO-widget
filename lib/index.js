'use strict';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import store from './store';
import actions from './actions';

class EbscoWidget extends Component {
    constructor(props) {
        super(props);
        if (store.getState().search.get('status') === 'NONE' && this.props.term) {
            store.dispatch(actions.changeTerm(this.props.term));
            store.dispatch(actions.search(this.props.term));
        }
    }

    render() {
        return (
            <Provider store={store}>
                {() => <App/>}
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
                    <EbscoWidget/>
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
