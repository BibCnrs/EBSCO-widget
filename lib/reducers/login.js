import {
    CHANGE_AUTHENTICATION_MODE,
    CHANGE_USERNAME,
    CHANGE_PASSWORD,
    LOGIN_SUCCESS,
    LOGIN_PENDING,
    LOGIN_ERROR,
    LOGIN_CANCEL,
    LOGOUT
} from '../actions';

export const defaultState = {
    status: 'NONE',
    username: '',
    password: '',
    mode: 'labintel',
    isLoggingWithRenater: false,
    token: null
};

export default function login(state = defaultState, action = {}) {
    switch (action.type) {
    case CHANGE_AUTHENTICATION_MODE:
        return {
            ...state,
            mode: action.value
        };
    case CHANGE_USERNAME:
        return {
            ...state,
            username: action.value
        };
    case CHANGE_PASSWORD:
        return {
            ...state,
            password: action.value
        };
    case LOGIN_SUCCESS:
        return {
            ...state,
            username: '',
            password: '',
            status: 'SUCCESS',
            token: action.response.token,
            isLoggingWithRenater: false
        };
    case LOGIN_PENDING:
        return {
            ...state,
            status: 'PENDING',
            isLoggingWithRenater: action.renater
        };
    case LOGIN_CANCEL:
        return {
            ...state,
            status: 'NONE',
            isLoggingWithRenater: false
        };
    case LOGIN_ERROR:
        return {
            ...state,
            status: 'ERROR',
            isLoggingWithRenater: false
        };
    case LOGOUT:
        return {
            ...defaultState,
            mode: state.mode
        };
    default:
        return state;
    }
}

export const isUserLogged = (state) => !!state.token;

export const isLoggingWithRenater = (state) => state.isLoggingWithRenater;
export const getToken = (state) => state.token;
export const getLoginData = (state) => ({
    username: state.username,
    password: state.password
});
