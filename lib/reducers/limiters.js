'use strict';

import { Map, fromJS } from 'immutable';
import { CHANGE_LIMITER, SHOW_LIMITER, LIMIT_SEARCH } from '../actions';

const defaultToPublicationDate = `${new Date().getFullYear() + 1}-01`;

export default function search(state = Map({
    limiterShown: false,
    hasChanged: false,
    fullText: true,
    publicationDate: Map({
        from: '1000-01',
        to: defaultToPublicationDate
    }),
    peerReviewed: false,
    author: null,
    journalName: null,
    title: null
}), action) {
    state = fromJS(state);
    switch (action.type) {
    case SHOW_LIMITER:
        return state.set('limiterShown', action.visibility);
    case CHANGE_LIMITER:
        return state
        .set(action.limiter, fromJS(action.value))
        .set('hasChanged', true);
    case LIMIT_SEARCH:
        return state.set('hasChanged', false);
    default:
        return state;
    }
}
