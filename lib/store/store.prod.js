import { compose, createStore, applyMiddleware } from 'redux';
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/sessionStorage';
import debounce from 'redux-localstorage-debounce';
import createSagaMiddleWare from 'redux-saga';

import rootReducer from '../reducers';
import sagas from '../sagas';

export default function () {
    const reducer = compose(
        mergePersistedState()
    )(rootReducer);

    const storage = compose(
        debounce(100)
    )(adapter(window.sessionStorage));

    const sagaMiddleware = createSagaMiddleWare();

    const middlewares = applyMiddleware(
        sagaMiddleware,
    );

    const devtools =
        typeof window !== 'undefined' && window.devToolsExtension
        ? window.devToolsExtension()
        : f => f;

    const persistStateEnhancer = persistState(storage);

    const store = createStore(
        reducer,
        {},
        compose(middlewares, persistStateEnhancer, devtools),
    );

    sagaMiddleware.run(sagas);

    return store;
}
