'use strict';

import { Map, fromJS } from 'immutable';
import { FULLTEXT_CHANGE, PUBLICATION_DATE_CHANGE } from '../actions';

export default function search(state = Map({
    fullText: true,
    fromPublicationDate: '01/01/1000',
    toPublicationDate: '01/01/3000'
}), action) {
    state = fromJS(state);
    switch (action.type) {
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
