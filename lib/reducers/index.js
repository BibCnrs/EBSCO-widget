import { combineReducers } from 'redux';
import search from './search';
import results from './results';
import login from './login';
import limiters from './limiters';
import open from './open';
import loading from './loading';

export default function reducers(url, token, term, domain) {
    return combineReducers({
        search: search(term, domain),
        results,
        login: login(token),
        limiters,
        open,
        loading,
        url: () => url
    });
}
