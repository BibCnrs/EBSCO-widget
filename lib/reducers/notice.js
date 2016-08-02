import { combineReducers } from 'redux';
import createNotice from './createNotice';

export default combineReducers({
    article: createNotice('article'),
    publication: createNotice('publication'),
    a2z: createNotice('a2z')
});

export * from './createNotice';
