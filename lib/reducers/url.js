import {
    SET_URL
} from '../actions';

export default function search(state = '', action) {
    switch (action.type) {
    case SET_URL:
        return action.value;
    default:
        return state;
    }
}
