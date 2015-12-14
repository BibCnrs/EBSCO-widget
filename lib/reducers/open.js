import {
    SEARCH_PENDING,
    LOGIN_PENDING,
    OPEN_SEARCH,
    LOGOUT
} from '../actions';

export default function open(state = false, action) {
    switch (action.type) {
    case LOGIN_PENDING:
    case SEARCH_PENDING:
        return true;
    case OPEN_SEARCH:
        return action.value;
    case LOGOUT:
        return false;
    default:
        return state;
    }
}
