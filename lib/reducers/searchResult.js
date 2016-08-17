import { combineReducers } from 'redux';

import createSearchResult from './createSearchResult';

export default combineReducers({
    article: createSearchResult('article'),
    publication: createSearchResult('publication')
});

export * from './createSearchResult';

export const getArticleSearchResult = (state) => state.article;
export const getPublicationSearchResult = (state) => state.publication;
