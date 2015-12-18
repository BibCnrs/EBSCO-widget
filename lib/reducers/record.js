import { fromJS, Map } from 'immutable';
import { SHOW_ABSTRACT } from '../actions';
import notice from './notice';

export default function record(state = Map(), action) {
    state = fromJS(state);
    switch (action.type) {
    case SHOW_ABSTRACT:
        return state
        .set('abstractShown', action.visibility)
        .set('notice', notice(state.get('notice'), action));
    default:
        return state
        .set('notice', notice(state.get('notice'), action));
    }
}
