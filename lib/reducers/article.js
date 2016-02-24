import { combineReducers } from 'redux';

import articleSearch from './articleSearch';
import articleSearchResult from './articleSearchResult';
import domains from './domains';
import history from './history';
import facets from './articleFacets';

export default function reducers(term, domain) {
    return combineReducers({
        search: articleSearch(term, domain),
        searchResult: articleSearchResult,
        domains,
        history,
        facets
    });
}
