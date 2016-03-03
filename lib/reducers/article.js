import { combineReducers } from 'redux';

import articleSearch from './articleSearch';
import articleSearchResult from './articleSearchResult';
import history from './history';
import facets from './articleFacets';

export default combineReducers({
    search: articleSearch,
    searchResult: articleSearchResult,
    history,
    facets
});
