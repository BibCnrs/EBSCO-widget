import { combineReducers } from 'redux';

import createLimiters from './createLimiters';

export default combineReducers({
    article: createLimiters('article'),
    publication: createLimiters('publication')
});

export * from './createLimiters';
