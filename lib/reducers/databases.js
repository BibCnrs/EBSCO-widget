import {
    RETRIEVE_DATABASE_SUCCESS,
} from '../actions';

export const defaultState = {};

export default function domains(state = defaultState, action) {
    switch (action.type) {
    case RETRIEVE_DATABASE_SUCCESS:
        return action.response;
    default:
        return state;
    }
}
