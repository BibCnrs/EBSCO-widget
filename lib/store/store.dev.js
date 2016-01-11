import { compose, createStore, applyMiddleware } from 'redux';
import { persistState as persistDevState } from 'redux-devtools';
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/sessionStorage';
import debounce from 'redux-localstorage-debounce';

import fetchMiddleware from '../middlewares/fetch';
import loginTokenMiddleware from '../middlewares/loginToken';
import retrieveMiddleware from '../middlewares/retrieve';
import facetMiddleware from '../middlewares/facet';
import searchMiddleware from '../middlewares/search';
import historyMiddleware from '../middlewares/history';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

export default function store(url, term, domain) {

    const reducer = compose(
        mergePersistedState()
    )(rootReducer(url, term, domain));

    const storage = compose(
        debounce(100)
    )(adapter(window.sessionStorage));

    const createPersistentStore = compose(
        persistState(storage, 'state')
    )(createStore);

    const finalCreateStore = compose(
        // Enables your middleware:
        applyMiddleware(
            facetMiddleware,
            searchMiddleware,
            retrieveMiddleware,
            fetchMiddleware,
            loginTokenMiddleware,
            historyMiddleware
        ),
        // Provides support for DevTools:
        DevTools.instrument(),
        // Lets you write ?debug_session=<name> in address bar to persist debug sessions
        persistDevState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createPersistentStore);


    return finalCreateStore(reducer);
}
