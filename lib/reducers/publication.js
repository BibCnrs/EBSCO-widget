import { combineReducers } from 'redux';

import publicationSearch from './publicationSearch';
import publicationSearchResult from './publicationSearchResult';
import publicationFacets from './publicationFacets';

export default combineReducers({
    search: publicationSearch,
    searchResult: publicationSearchResult,
    facets: publicationFacets
});
