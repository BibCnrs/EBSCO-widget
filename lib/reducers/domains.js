import {
    LOGIN_SUCCESS,
    LOGOUT
} from '../actions';

const defaultState = () => JSON.parse(window.sessionStorage.getItem('domains')) || [];

export default function search(state = defaultState(), action) {
    switch (action.type) {
    case LOGIN_SUCCESS:
        return action.response.domains;
    case LOGOUT:
        return defaultState();
    default:
        return state;
    }
}
