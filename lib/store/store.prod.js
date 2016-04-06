import { compose, createStore, applyMiddleware } from 'redux';
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/sessionStorage';
import debounce from 'redux-localstorage-debounce';

import fetchMiddleware from '../middlewares/fetch';
import retrieveMiddleware from '../middlewares/retrieve';
import searchMiddleware from '../middlewares/search';
import historyMiddleware from '../middlewares/history';
import rootReducer from '../reducers';

const reducer = compose(
    mergePersistedState()
)(rootReducer);

const storage = compose(
    debounce(100)
)(adapter(window.sessionStorage));

const createPersistentStore = compose(
    persistState(storage, 'state')
)(createStore);

const finalCreateStore = applyMiddleware(
    searchMiddleware,
    retrieveMiddleware,
    fetchMiddleware,
    historyMiddleware
)(createPersistentStore);

export default finalCreateStore(reducer);
