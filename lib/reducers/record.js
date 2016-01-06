import { SHOW_ABSTRACT } from '../actions';
import notice from './notice';

export default function record(state = {}, action) {
    switch (action.type) {
    case SHOW_ABSTRACT:
        return {
            ...state,
            abstractShown: action.visibility,
            notice: notice(state.notice, action)
        };
    default:
        return {
            ...state,
            notice: notice(state.notice, action)
        };
    }
}
