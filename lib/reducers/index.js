'use strict';

import { combineReducers } from 'redux';
import search from './search';
import results from './results';
import login from './login';

export default combineReducers({
    search,
    results,
    login
});
