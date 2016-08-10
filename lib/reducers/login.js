import {
    CHANGE_AUTHENTICATION_MODE,
    CHANGE_USERNAME,
    CHANGE_PASSWORD,
    LOGIN_SUCCESS,
    API_LOGIN_SUCCESS,
    API_LOGIN_PENDING,
    API_LOGIN_ERROR,
    LOGOUT
} from '../actions';

export const defaultState = {
    status: 'NONE',
    username: '',
    password: '',
    mode: 'labintel',
    token: null
};

export default function login(state = defaultState, action) {
    switch (action.type) {
    case CHANGE_AUTHENTICATION_MODE:
        return {
            ...state,
            mode: action.mode
        };
    case CHANGE_USERNAME:
        return {
            ...state,
            username: action.username
        };
    case CHANGE_PASSWORD:
        return {
            ...state,
            password: action.password
        };
    case API_LOGIN_SUCCESS:
    case LOGIN_SUCCESS:
        return {
            ...state,
            username: '',
            password: '',
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
            ...defaultState,
            mode: state.mode
        };
    default:
        return state;
    }
}

export const isUserLogged = (state) => !!state.token;

export const getToken = (state) => state.token;
export const getLoginData = (state) => ({
    username: state.username,
    password: state.password
});
