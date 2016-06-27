import { combineReducers } from 'redux';

import createLimiters, * as fromLimiters from './createLimiters';

export default combineReducers({
    article: createLimiters('article'),
    publication: createLimiters('publication')
});

export const getValueByName = (state, category, name) =>
    fromLimiters.getValueByName(state[category], name);
