import { combineReducers } from 'redux';

import createFacets from './createFacets';

export default combineReducers({
    article: createFacets('article'),
    publication: createFacets('publication'),
});

export * from './createFacets';
