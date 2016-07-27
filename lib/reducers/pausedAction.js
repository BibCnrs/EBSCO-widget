import {
    PAUSE_ACTION,
    API_LOGIN_ERROR,
    HIDE_LOGIN
} from '../actions';

export const defaultState = {
    type: 'NONE'
};

export default function login(state = defaultState, action) {
    switch (action.type) {
    case PAUSE_ACTION:
        return action.action;
    case HIDE_LOGIN:
    case API_LOGIN_ERROR:
        return defaultState;
    default:
        return state;
    }
}
