import { combineReducers } from 'redux';
import search from './search';
import searchResult from './searchResult';
import login from './login';
import open from './open';
import loading from './loading';
import domains from './domains';

export default function reducers(url, term, domain) {
    return combineReducers({
        search: search(term, domain),
        searchResult,
        login,
        open,
        loading,
        domains,
        url: () => url
    });
}
