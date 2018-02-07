import { compose, createStore, applyMiddleware } from 'redux';
import persistState, { mergePersistedState } from 'redux-localstorage';
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

    const createPersistentStore = compose(
        persistState(storage, 'state')
    )(createStore);

    const sagaMiddleware = createSagaMiddleWare();

    const finalCreateStore = compose(
        // Enables your middleware:
        applyMiddleware(
            sagaMiddleware
        ),
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

    return store;
}
