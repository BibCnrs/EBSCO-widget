import { combineReducers } from 'redux';

import createLimiters, * as fromLimiters from './createLimiters';

export default combineReducers({
    article: createLimiters('article'),
    publication: createLimiters('publication')
});

export const getValue = (state, category, name) =>
    fromLimiters(state[category], name);
