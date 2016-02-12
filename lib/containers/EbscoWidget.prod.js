import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import App from './App';
import getStore from '../store';

const EbscoWidget = ({ url, term, domain }) => {

    const store = getStore(url, term, domain);
    return (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                </Route>
            </Router>
        </Provider>
    );
};

export default EbscoWidget;
