import { compose, createStore, applyMiddleware } from 'redux';
import { persistState as persistDevState } from 'redux-devtools';
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/sessionStorage';
import debounce from 'redux-localstorage-debounce';
import createSagaMiddleWare from 'redux-saga';

import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
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
        // Enables your middleware:
        applyMiddleware(
            sagaMiddleware
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
    }, { url, dbUrl });

    sagaMiddleware.run(sagas);

    window.store = store;

    return store;
}
