import { List, fromJS } from 'immutable';
import {
    LOGIN_SUCCESS,
    LOGOUT
} from '../actions';

const defaultState = () => List(JSON.parse(window.sessionStorage.getItem('domains')) || []);

export default function search(state = defaultState(), action) {
    state = fromJS(state);
    switch (action.type) {
    case LOGIN_SUCCESS:
        return List(action.response.domains);
    case LOGOUT:
        return defaultState();
    default:
        return state;
    }
}
