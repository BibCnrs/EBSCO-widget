import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Authentication from '../containers/Authentication';
import EDS from '../containers/EDS';
import AdvancedEDS from '../containers/AdvancedEDS';
import App from './App';

const BibRouter = () => {

    return (
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={EDS}/>
                <Route path="/login" component={Authentication}/>
                <Route path="/advancedEDS" component={AdvancedEDS}/>
            </Route>
        </Router>
    );
};

export default BibRouter;
