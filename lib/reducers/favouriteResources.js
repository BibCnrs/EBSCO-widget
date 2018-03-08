import { LOGIN_SUCCESS, LOGOUT } from '../actions';

export const defaultState = [];

export default function domains(state = defaultState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.response.favouriteResources || [];
        case LOGOUT:
            return [];
        default:
            return state;
    }
}
