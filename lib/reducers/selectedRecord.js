import { combineReducers } from 'redux';

import createSelectedRecord from './createSelectedRecord';

export default combineReducers({
    article: createSelectedRecord('article'),
    publication: createSelectedRecord('publication'),
    a2z: createSelectedRecord('a2z')
});

export * from './createSelectedRecord';
