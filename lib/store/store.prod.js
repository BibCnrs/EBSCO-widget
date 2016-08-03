import { compose, createStore, applyMiddleware } from 'redux';
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/sessionStorage';
import debounce from 'redux-localstorage-debounce';
import createSagaMiddleWare from 'redux-saga';

import rootReducer from '../reducers';
import sagas from '../sagas';

export default function (url, dbUrl) {
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
        applyMiddleware(
            sagaMiddleware
        )
    )(createPersistentStore);

    const store = finalCreateStore(reducer, { url, dbUrl });

    sagaMiddleware.run(sagas);

    return store;
}
