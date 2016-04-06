import { combineReducers } from 'redux';

import publicationSearch from './publicationSearch';
import publicationSearchResult from './publicationSearchResult';

export default combineReducers({
    search: publicationSearch,
    searchResult: publicationSearchResult
});
