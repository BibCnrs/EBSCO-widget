import {
    SET_TOKEN,
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
} from '../actions';

export default function login(state = {
    status: 'NONE',
    token: null
}, action) {
    switch (action.type) {
    case SET_TOKEN:
        return {
            ...state,
            token: action.value
        };
    case LOGIN_PENDING:
        return {
            ...state,
            token: undefined,
            error: undefined,
            status: 'PENDING'
        };
    case LOGIN_SUCCESS:
        return {
            ...state,
            token: action.response.token,
            error: undefined,
            status: 'SUCCESS'
        };
    case LOGIN_ERROR:
        return {
            ...state,
            token: undefined,
            status: 'ERROR',
            error: action.error.message
        };
    case LOGOUT:
        return {
            ...state,
            token: undefined,
            status: 'NONE'
        };
    default:
        return state;
    }
}
