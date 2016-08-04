import {
    LOGIN_SUCCESS,
    API_LOGIN_SUCCESS,
    API_LOGIN_PENDING,
    API_LOGIN_ERROR,
    SET_TOKEN,
    LOGOUT
} from '../actions';

export const defaultState = {
    status: 'NONE',
    token: null
};

export default function login(state = defaultState, action) {
    switch (action.type) {
    case SET_TOKEN:
        return {
            ...state,
            token: action.token
        };
    case API_LOGIN_SUCCESS:
    case LOGIN_SUCCESS:
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
        return defaultState;
    default:
        return state;
    }
}

export const isUserLogged = (state) => !!state.token;

export const getToken = (state) => state.token;
