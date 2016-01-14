import {
    SHOW_NOTICE,
    RETRIEVE_PENDING,
    RETRIEVE_SUCCESS,
    LOGOUT
} from '../actions';

const defaultState = { shown: false, data: [] };

export default function result(state = defaultState, action) {
    switch (action.type) {
    case SHOW_NOTICE:
        return {
            ...state,
            shown: action.visibility
        };
    case RETRIEVE_PENDING:
        return {
            ...state,
            shown: false
        };
    case RETRIEVE_SUCCESS:
        return {
            ...state,
            data: action.response,
            shown: true
        };
    case LOGOUT:
        return defaultState;
    default:
        return state;
    }
}
