'use strict';

import { combineReducers } from 'redux';
import search from './search';
import results from './results';
import login from './login';
import limiters from './limiters';

export default combineReducers({
    search,
    results,
    login,
    limiters
});
