import { combineReducers } from 'redux';

import createSelectedRecord from './createSelectedRecord';

export default combineReducers({
    article: createSelectedRecord('article'),
    publication: createSelectedRecord('publication')
});

export * from './createSelectedRecord';
