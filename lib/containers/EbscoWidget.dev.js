import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import App from './App';
import DevTools from './DevTools';
import getStore from '../store';

const EbscoWidget = ({ url, term, domain }) => {
    const store = getStore(url, term, domain);

    return (
        <Provider store={store}>
            <div>
                <Router history={browserHistory}>
                    <Route path="/" component={App}>
                    </Route>
                </Router>
                <DevTools/>
            </div>
        </Provider>
    );
};

export default EbscoWidget;
