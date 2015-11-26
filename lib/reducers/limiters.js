'use strict';

import { Map, fromJS } from 'immutable';
import { FULLTEXT_CHANGE, CHANGE_PUBLICATION_DATE, LIMIT_PUBLICATION_DATE, SHOW_LIMITER } from '../actions';

const defaultToPublicationDate = `${new Date().getFullYear() + 1}-01`;

export default function search(state = Map({
    limiterShown: false,
    fullText: true,
    publicationDate: Map({
        from: '1000-01',
        to: defaultToPublicationDate
    })
}), action) {
    state = fromJS(state);
    switch (action.type) {
    case SHOW_LIMITER:
        return state.set('limiterShown', action.visibility);
    case FULLTEXT_CHANGE:
        return state.set('fullText', action.fullText);
    case CHANGE_PUBLICATION_DATE:
    case LIMIT_PUBLICATION_DATE:
        return state
        .set('publicationDate', Map({ from: action.from, to: action.to}));
    default:
        return state;
    }
}
