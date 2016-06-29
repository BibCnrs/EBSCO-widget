import { combineReducers } from 'redux';

import createQueryList, * as fromQueryList from './createQueryList';

export default combineReducers({
    article: createQueryList('article'),
    a2z: createQueryList('a2z'),
    publication: createQueryList('publication')
});

export const getQueries = (state, category) =>
    fromQueryList.getQueries(state[category]);

export const getLetters = (state, category) =>
    fromQueryList.getLetters(state[category]);

export const getTerm = (state, category, index) =>
    fromQueryList.getTerm(state[category], index);

export const getBoolean = (state, category, index) =>
    fromQueryList.getBoolean(state[category], index);

export const getField = (state, category, index) =>
    fromQueryList.getField(state[category], index);
