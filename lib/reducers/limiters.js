'use strict';

import { Map, fromJS } from 'immutable';
import { FULLTEXT_CHANGE } from '../actions';

export default function search(state = Map({ fullText: true, fromPublicationDate: new Date(0), toPublicationDate: new Date() }), action = {}) {
    switch (action.type) {
    case FULLTEXT_CHANGE:
        return fromJS(state).set('fullText', action.fullText);
    default:
        return fromJS(state);
    }
}
