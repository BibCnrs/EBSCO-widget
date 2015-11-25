'use strict';

import { combineReducers } from 'redux';
import search from './search';
import results from './results';
import login from './login';
import limiters from './limiters';
import open from './open';

export default function reducers(url, token, term) {
    return combineReducers({
        search: search(term),
        results,
        login: login(token),
        limiters,
        open,
        url: () => url
    });
}
