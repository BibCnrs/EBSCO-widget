import { compose, createStore, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';

import fetchMiddleware from '../middlewares/fetch';
import loginTokenMiddleware from '../middlewares/loginToken';
import retrieveMiddleware from '../middlewares/retrieve';
import searchMiddleware from '../middlewares/search';
import reducers from '../reducers';
import DevTools from '../containers/DevTools';

export default function store(url, term, domain) {
    const finalCreateStore = compose(
        // Enables your middleware:
        applyMiddleware(
            searchMiddleware,
            retrieveMiddleware,
            fetchMiddleware,
            loginTokenMiddleware
        ),
        // Provides support for DevTools:
        DevTools.instrument(),
        // Lets you write ?debug_session=<name> in address bar to persist debug sessions
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);


    return finalCreateStore(reducers(url, term, domain));
}
