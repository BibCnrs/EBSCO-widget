import {
    PAUSE_ACTION,
    API_LOGIN_ERROR
} from '../actions';

export const defaultState = {
    type: 'NONE'
};

export default function login(state = defaultState, action) {
    switch (action.type) {
    case PAUSE_ACTION:
        return action.action;
    case API_LOGIN_ERROR:
        return defaultState;
    default:
        return state;
    }
}
