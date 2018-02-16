import { INITIALIZE } from '../actions';

export default function search(state = '', action) {
    switch (action.type) {
        case INITIALIZE:
            return action.url;
        default:
            return state;
    }
}
