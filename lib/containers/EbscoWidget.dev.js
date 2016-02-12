import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Authentication from './Authentication';
import EDS from './EDS';

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
                        <IndexRoute component={EDS}/>
                        <Route path="/login" component={Authentication}/>
                    </Route>
                </Router>
                <DevTools/>
            </div>
        </Provider>
    );
};

export default EbscoWidget;
