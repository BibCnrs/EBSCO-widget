import { compose, createStore, applyMiddleware } from 'redux';
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/sessionStorage';
import debounce from 'redux-localstorage-debounce';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';

import fetchMiddleware from '../middlewares/fetch';
import loginTokenMiddleware from '../middlewares/loginToken';
import retrieveMiddleware from '../middlewares/retrieve';
import facetMiddleware from '../middlewares/facet';
import searchMiddleware from '../middlewares/search';
import historyMiddleware from '../middlewares/history';
import rootReducer from '../reducers';

export default function store(url, term, domain) {
    const reduxRouterMiddleware = syncHistory(browserHistory);

    const reducer = compose(
        mergePersistedState()
    )(rootReducer(url, term, domain));

    const storage = compose(
        debounce(100)
    )(adapter(window.sessionStorage));

    const createPersistentStore = compose(
        persistState(storage, 'state')
    )(createStore);

    const finalCreateStore = applyMiddleware(
        reduxRouterMiddleware,
        facetMiddleware,
        searchMiddleware,
        retrieveMiddleware,
        fetchMiddleware,
        loginTokenMiddleware,
        historyMiddleware
    )(createPersistentStore);

    return finalCreateStore(reducer);
}
