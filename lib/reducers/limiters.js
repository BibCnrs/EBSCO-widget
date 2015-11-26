'use strict';

import { Map, fromJS } from 'immutable';
import { CHANGE_LIMITER, SHOW_LIMITER } from '../actions';

const defaultToPublicationDate = `${new Date().getFullYear() + 1}-01`;

export default function search(state = Map({
    limiterShown: false,
    fullText: true,
    publicationDate: Map({
        from: '1000-01',
        to: defaultToPublicationDate
    }),
    peerReviewed: false,
    author: null
}), action) {
    state = fromJS(state);
    switch (action.type) {
    case SHOW_LIMITER:
        return state.set('limiterShown', action.visibility);
    case CHANGE_LIMITER:
        return state
        .set(action.limiter, fromJS(action.value));
    default:
        return state;
    }
}
