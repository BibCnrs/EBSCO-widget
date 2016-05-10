import {
    FETCH_DOMAINS_SUCCESS,
    FETCH_DOMAINS_ERROR,
    FETCH_DOMAINS_PENDING
} from '../actions';

export const defaultState = [];

export default function search(state = defaultState, action) {
    switch (action.type) {
    case FETCH_DOMAINS_SUCCESS:
        return action.response;
    case FETCH_DOMAINS_ERROR:
    case FETCH_DOMAINS_PENDING:
        return defaultState;
    default:
        return state;
    }
}
