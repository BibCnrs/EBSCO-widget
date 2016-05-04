import {
    LOGIN,
    API_LOGIN_SUCCESS,
    API_LOGIN_PENDING,
    API_LOGIN_ERROR,
    LOGOUT
} from '../actions';

export default function login(state = {
    status: 'NONE',
    token: null
}, action) {
    switch (action.type) {
    case LOGIN:
        return {
            ...state,
            status: 'SUCCESS',
            token: action.token
        };
    case API_LOGIN_SUCCESS:
        return {
            ...state,
            status: 'SUCCESS',
            token: action.response.token
        };
    case API_LOGIN_PENDING:
        return {
            ...state,
            status: 'PENDING'
        };
    case API_LOGIN_ERROR:
        return {
            ...state,
            status: 'ERROR'
        };
    case LOGOUT:
        return {
            ...state,
            status: 'NONE',
            token: undefined
        };
    default:
        return state;
    }
}
