'use strict';

import { combineReducers } from 'redux';
import search from './search';
import results from './results';
import login from './login';
import limiters from './limiters';
import open from './open';
import loading from './loading';

export default function reducers(url, token, term) {
    return combineReducers({
        search: search(term),
        results,
        login: login(token),
        limiters,
        open,
        loading,
        url: () => url
    });
}
