import { combineReducers } from 'redux';
import search from './search';
import searchResult from './searchResult';
import login from './login';
import domains from './domains';
import history from './history';
import error from './error';
import userInterface from './userInterface';
import facets from './facets';

export default function reducers(url, term, domain) {
    return combineReducers({
        search: search(term, domain),
        searchResult,
        login,
        userInterface,
        domains,
        history,
        facets,
        error,
        url: () => url
    });
}
