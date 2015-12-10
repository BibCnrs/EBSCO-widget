import { SEARCH_PENDING, OPEN_SEARCH } from '../actions';

export default function open(state = false, action) {
    switch (action.type) {
    case SEARCH_PENDING:
        return true;
    case OPEN_SEARCH:
        return action.value;
    default:
        return state;
    }
}
