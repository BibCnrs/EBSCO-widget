import { combineReducers } from 'redux';

import createSearch from './createSearch';

export default combineReducers({
    article: createSearch('article'),
    a2z: createSearch('a2z'),
    publication: createSearch('publication')
});

export * from './createSearch';
