import { combineReducers } from 'redux';

import createQueryList from './createQueryList';

export default combineReducers({
    article: createQueryList('article'),
    publication: createQueryList('publication'),
    metadore: createQueryList('metadore'),
});

export * from './createQueryList';
