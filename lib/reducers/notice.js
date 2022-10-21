import { combineReducers } from 'redux';
import createNotice from './createNotice';

export default combineReducers({
    article: createNotice('article'),
    publication: createNotice('publication'),
    metadore: createNotice('metadore'),
});

export * from './createNotice';
