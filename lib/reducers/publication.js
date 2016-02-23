import { combineReducers } from 'redux';

import publicationSearch from './publicationSearch';
import publicationSearchResult from './publicationSearchResult';
import domains from './domains';

export default combineReducers({
    search: publicationSearch,
    searchResult: publicationSearchResult,
    domains
});
