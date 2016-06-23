import { combineReducers } from 'redux';

import articleSearch from './articleSearch';
import history from './history';

export default combineReducers({
    search: articleSearch,
    history
});
