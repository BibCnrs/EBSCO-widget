import _ from 'lodash';
import { combineReducers } from 'redux';

import createLimiters from './createLimiters';

export const defaultState = {
    article: {
        fullText: true,
        publicationDate: {
            from: null,
            to: null
        },
        peerReviewed: false
    },
    publication: {
        peerReviewed: false
    }
};

export default combineReducers({
    article: createLimiters('article', defaultState.article),
    publication: createLimiters('publication', defaultState.publication)
});

export const isDefaultLimiter = (state, location) => _.isEqual(state[location], defaultState[location]);

export * from './createLimiters';
