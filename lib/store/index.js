'use strict';

import { compose, createStore, applyMiddleware } from 'redux';

import fetchMiddleware from '../middlewares/fetch';
import reducers from '../reducers';

let finalCreateStore;
if (__DEVELOPMENT__) {
    const { devTools, persistState } = require('redux-devtools');

    finalCreateStore = compose(
    // Enables your middleware:
        applyMiddleware(fetchMiddleware),
        // Provides support for DevTools:
        devTools(),
        // Lets you write ?debug_session=<name> in address bar to persist debug sessions
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
} else {
    finalCreateStore = applyMiddleware(
        fetchMiddleware
    )(createStore);
}

export default finalCreateStore(reducers);
