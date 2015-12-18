import { combineReducers } from 'redux';
import search from './search';
import searchResult from './searchResult';
import login from './login';
import limiters from './limiters';
import open from './open';
import loading from './loading';

export default function reducers(url, term, domain) {
    return combineReducers({
        search: search(term, domain),
        searchResult,
        login,
        limiters,
        open,
        loading,
        url: () => url
    });
}
