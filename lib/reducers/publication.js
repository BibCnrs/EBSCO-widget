import { combineReducers } from 'redux';

import publicationSearch from './publicationSearch';
import publicationSearchResult from './publicationSearchResult';
import publicationFacets from './publicationFacets';

import domains from './domains';

export default combineReducers({
    search: publicationSearch,
    searchResult: publicationSearchResult,
    facets: publicationFacets,
    domains
});
