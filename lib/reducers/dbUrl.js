import {
    SET_DB_URL
} from '../actions';

export default function search(state = null, action) {
    switch (action.type) {
    case SET_DB_URL:
        return action.value;
    default:
        return state;
    }
}
