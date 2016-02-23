import { combineReducers } from 'redux';
import articleSearch from './articleSearch';
import articleSearchResult from './articleSearchResult';
import login from './login';
import domains from './domains';
import history from './history';
import error from './error';
import userInterface from './userInterface';
import facets from './facets';

export default function reducers(url, term, domain) {
    return combineReducers({
        articleSearch: articleSearch(term, domain),
        articleSearchResult,
        login,
        userInterface,
        domains,
        history,
        facets,
        error,
        url: () => url
    });
}
