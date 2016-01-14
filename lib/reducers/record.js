import {
    RETRIEVE_SUCCESS
} from '../actions';

export default function record(state = {}, action) {
    switch (action.type) {
    case RETRIEVE_SUCCESS:
        return {
            ...state,
            notice: action.response
        };
    default:
        return state;
    }
}
