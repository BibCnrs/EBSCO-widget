import {
    INITIALIZE
} from '../actions';

export default function search(state = null, action) {
    switch (action.type) {
    case INITIALIZE:
        return action.dbUrl;
    default:
        return state;
    }
}
