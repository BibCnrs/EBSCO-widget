import {
    SHOW_NOTICE,
    RETRIEVE_PENDING,
    RETRIEVE_SUCCESS,
    RETRIEVE_ERROR,
    LOGOUT
} from '../actions';

const defaultState = { status: 'NONE', data: [] };

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
            error: undefined,
            shown: false,
            status: 'PENDING'
        };
    case RETRIEVE_SUCCESS:
        return {
            ...state,
            data: action.response,
            status: 'SUCCESS',
            shown: true
        };
    case RETRIEVE_ERROR:
        return {
            ...state,
            data: [],
            status: 'ERROR',
            shown: false,
            error: action.error.message
        };
    case LOGOUT:
        return defaultState;
    default:
        return state;
    }
}
