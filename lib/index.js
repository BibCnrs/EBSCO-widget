'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import store from './store';


let rootElement = document.getElementById('root');
React.render(
    // The child must be wrapped in a function
    // to work around an issue in React 0.13.
    <Provider store={store}>
        {() => <App />}
    </Provider>,
    rootElement
);
