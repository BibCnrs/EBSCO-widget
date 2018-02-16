import { combineReducers } from 'redux';

import createSearch from './createSearch';

export default combineReducers({
    article: createSearch('article'),
    publication: createSearch('publication'),
});

export * from './createSearch';
