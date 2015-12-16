import { fromJS, List } from 'immutable';
import {
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    SEARCH_PENDING,
    LOGOUT
} from '../actions';

import record from './record';

export default function results(state = List(), action) {
    state = fromJS(state);
    switch (action.type) {
    case SEARCH_SUCCESS:
        return fromJS(action.response.results)
        .map((item) => record(item, action));
    case SEARCH_PENDING:
    case SEARCH_ERROR:
    case LOGOUT:
        return List();
    default:
        const index = action.index;
        return state.set(index, record(state.get(index), action));
    }
}
