import { combineReducers } from 'redux';
import search from './search';
import articleSearchResult from './articleSearchResult';
import login from './login';
import domains from './domains';
import history from './history';
import error from './error';
import userInterface from './userInterface';
import facets from './facets';

export default function reducers(url, term, domain) {
    return combineReducers({
        search: search(term, domain),
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
