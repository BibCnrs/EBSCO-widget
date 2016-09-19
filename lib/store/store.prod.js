import { compose, createStore, applyMiddleware } from 'redux';
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/sessionStorage';
import debounce from 'redux-localstorage-debounce';
import createSagaMiddleWare from 'redux-saga';

import rootReducer from '../reducers';
import sagas from '../sagas';

export default function (url, dbUrl, domain, language) {
    const defaultState = rootReducer(undefined, {});
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

    const finalCreateStore = compose(
        applyMiddleware(
            sagaMiddleware
        )
    )(createPersistentStore);

    const store = finalCreateStore(reducer, {
        ...defaultState,
        url,
        dbUrl,
        domains: {
            ...defaultState.domains,
            defaultDomain: domain
        },
        userInterface: {
            ...defaultState.userInterface,
            language
        }
    });

    sagaMiddleware.run(sagas);

    return store;
}
