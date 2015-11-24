'use strict';

import { Map, fromJS } from 'immutable';
import { FULLTEXT_CHANGE, PUBLICATION_DATE_CHANGE, SHOW_LIMITER } from '../actions';

const defaultToPublicationDate = `${new Date().getFullYear() + 1}-01`;

export default function search(state = Map({
    limiterShown: false,
    fullText: true,
    fromPublicationDate: '1000-01',
    toPublicationDate: defaultToPublicationDate
}), action) {
    state = fromJS(state);
    switch (action.type) {
    case SHOW_LIMITER:
        return state.set('limiterShown', action.visibility);
    case FULLTEXT_CHANGE:
        return state.set('fullText', action.fullText);
    case PUBLICATION_DATE_CHANGE:
        return state
        .set('fromPublicationDate', action.from)
        .set('toPublicationDate', action.to);
    default:
        return state;
    }
}
