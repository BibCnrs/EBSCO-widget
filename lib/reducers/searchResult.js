import { combineReducers } from 'redux';

import createSearchResult from './createSearchResult';

export default combineReducers({
    article: createSearchResult('article'),
    a2z: createSearchResult('a2z'),
    publication: createSearchResult('publication')
});

export * from './createSearchResult';
