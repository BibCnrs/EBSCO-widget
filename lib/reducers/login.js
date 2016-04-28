import {
    LOGIN,
    LOGOUT
} from '../actions';

export default function login(state = {
    token: null
}, action) {
    switch (action.type) {
    case LOGIN:
        return {
            ...state,
            token: action.token
        };
    case LOGOUT:
        return {
            ...state,
            token: undefined
        };
    default:
        return state;
    }
}
