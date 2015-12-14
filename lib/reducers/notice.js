import { fromJS, Map, List } from 'immutable';
import {
    SHOW_NOTICE,
    RETRIEVE_PENDING,
    RETRIEVE_SUCCESS,
    RETRIEVE_ERROR,
    LOGOUT
} from '../actions';

const defaultState = Map({ status: 'NONE', data: List() });

export default function result(state = defaultState, action) {
    state = fromJS(state);
    switch (action.type) {
    case SHOW_NOTICE:
        return state
        .set('shown', action.visibility);
    case RETRIEVE_PENDING:
        return state
        .delete('error')
        .set('shown', false)
        .set('status', 'PENDING');
    case RETRIEVE_SUCCESS:
        return state
        .set('data', List(action.response))
        .set('status', 'SUCCESS')
        .set('shown', true);
    case RETRIEVE_ERROR:
        return state
        .set('data', List())
        .set('status', 'ERROR')
        .set('shown', false)
        .set('error', action.error.message);
    case LOGOUT:
        return defaultState;
    default:
        return state;
    }
}
