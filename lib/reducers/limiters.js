'use strict';

import { Map, fromJS } from 'immutable';
import { CHANGE_LIMITER, SHOW_LIMITER, SHOW_MORE_LIMITER, LIMIT_SEARCH, RESET_LIMITER } from '../actions';

const defaultToPublicationDate = `${new Date().getFullYear() + 1}-01`;

const defaultState = Map({
    limiterShown: true,
    moreShown: false,
    hasChanged: false,
    fullText: true,
    publicationDate: Map({
        from: '1000-01',
        to: defaultToPublicationDate
    }),
    peerReviewed: false,
    author: null,
    journalName: null,
    title: null,
    language: null
});

export default function search(state = defaultState, action) {
    state = fromJS(state);
    switch (action.type) {
    case SHOW_LIMITER:
        return state.set('limiterShown', action.visibility);
    case SHOW_MORE_LIMITER:
        return state.set('moreShown', action.visibility);
    case CHANGE_LIMITER:
        return state
        .set(action.limiter, fromJS(action.value))
        .set('hasChanged', true);
    case LIMIT_SEARCH:
        return state.set('hasChanged', false);
    case RESET_LIMITER:
        return defaultState
        .set('limiterShown', true)
        .set('moreShown', state.get('moreShown'));
    default:
        return state;
    }
}
