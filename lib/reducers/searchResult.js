import { combineReducers } from 'redux';

import createSearchResult, * as fromSearchResult from './createSearchResult';

export default combineReducers({
    article: createSearchResult('article'),
    a2z: createSearchResult('a2z'),
    publication: createSearchResult('publication')
});

export const getCurrentPage = (state, category) => {
    return fromSearchResult.getCurrentPage(state[category]);
};

export const getCurrentPageRecords = (state, category) => {
    return fromSearchResult.getCurrentPageRecords(state[category]);
};

export const getPaginationData = (state, category) => {
    return fromSearchResult.getPaginationData(state[category]);
};

export const getRecordById = (state, category, id) => {
    return fromSearchResult.getRecordById(state[category], id);
};

export const getRecordPublicationIdByIds = (state, category, ids) => {
    return fromSearchResult.getRecordPublicationIdByIds(state[category], ids);
};
