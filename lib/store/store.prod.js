import { compose, createStore, applyMiddleware } from 'redux';
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/sessionStorage';
import debounce from 'redux-localstorage-debounce';
import createSagaMiddleWare from 'redux-saga';

import fetchMiddleware from '../middlewares/fetch';
import storageMiddleware from '../middlewares/storage';
import authenticationMiddleware from '../middlewares/authentication';
import rootReducer from '../reducers';

import sagas from '../sagas';

export default function(url, dbUrl) {
    const reducer = compose(
        mergePersistedState()
    )(rootReducer);

    const storage = compose(
        debounce(100)
    )(adapter(window.sessionStorage));

    const createPersistentStore = compose(
        persistState(storage, 'state')
    )(createStore);

    const sagaMiddleware = createSagaMiddleWare();

    const finalCreateStore = applyMiddleware(
        sagaMiddleware,
        fetchMiddleware,
        authenticationMiddleware,
        storageMiddleware
    )(createPersistentStore);

    sagaMiddleware.run(sagas);

    return finalCreateStore(reducer, { url, dbUrl });
}
