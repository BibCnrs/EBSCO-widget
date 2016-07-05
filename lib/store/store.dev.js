import { compose, createStore, applyMiddleware } from 'redux';
import { persistState as persistDevState } from 'redux-devtools';
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/sessionStorage';
import debounce from 'redux-localstorage-debounce';
import createSagaMiddleWare from 'redux-saga';

import fetchMiddleware from '../middlewares/fetch';
import retrieveMiddleware from '../middlewares/retrieve';
import searchMiddleware from '../middlewares/search';
import storageMiddleware from '../middlewares/storage';
import authenticationMiddleware from '../middlewares/authentication';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import sagas from '../sagas';


const reducer = compose(
    mergePersistedState()
)(rootReducer);

const storage = compose(
    debounce(1000)
)(adapter(window.sessionStorage));

const createPersistentStore = compose(
    persistState(storage, 'state')
)(createStore);

const sagaMiddleware = createSagaMiddleWare();

const finalCreateStore = compose(
    // Enables your middleware:
    applyMiddleware(
        sagaMiddleware,
        fetchMiddleware,
        authenticationMiddleware,
        searchMiddleware,
        retrieveMiddleware,
        storageMiddleware
    ),
    // Provides support for DevTools:
    DevTools.instrument(),
    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    persistDevState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createPersistentStore);

const store = finalCreateStore(function(state, action) {
    switch(action.type) {
    case 'SET_STATE':
        return action.state || reducer({}, action);
    default:
        return reducer(state, action);
    }
});

sagaMiddleware.run(sagas);

window.store = store;

export default store;
