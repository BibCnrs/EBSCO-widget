'use strict';

import { compose, createStore, applyMiddleware } from 'redux';

import fetchMiddleware from '../middlewares/fetch';
import loginTokenMiddleware from '../middlewares/loginToken';
import searchMiddleware from '../middlewares/search';
import reducers from '../reducers';

export default function store(url, token, term) {

    let finalCreateStore;
    if (__DEVELOPMENT__) {
        const { devTools, persistState } = require('redux-devtools');

        finalCreateStore = compose(
        // Enables your middleware:
            applyMiddleware(
                searchMiddleware,
                fetchMiddleware,
                loginTokenMiddleware
            ),
            // Provides support for DevTools:
            devTools(),
            // Lets you write ?debug_session=<name> in address bar to persist debug sessions
            persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        )(createStore);
    } else {
        finalCreateStore = applyMiddleware(
            searchMiddleware,
            fetchMiddleware,
            loginTokenMiddleware
        )(createStore);
    }

    return finalCreateStore(reducers(url, token, term));
}
