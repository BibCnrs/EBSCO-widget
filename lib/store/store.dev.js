import { compose, createStore, applyMiddleware } from 'redux';
import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/sessionStorage';
import debounce from 'redux-localstorage-debounce';
import createSagaMiddleWare from 'redux-saga';

import pureReducer from '../reducers';
import sagas from '../sagas';

export default function() {
    const rootReducer = function(state, action) {
        switch (action.type) {
            case 'SET_STATE':
                return action.state || pureReducer({}, action);
            default:
                return pureReducer(state, action);
        }
    };

    const reducer = compose(mergePersistedState())(rootReducer);

    const storage = compose(debounce(100))(adapter(window.sessionStorage));

    const sagaMiddleware = createSagaMiddleWare();

    const middlewares = applyMiddleware(sagaMiddleware);

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

    window.store = store;

    return store;
}
