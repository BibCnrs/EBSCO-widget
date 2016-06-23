import { combineReducers } from 'redux';

import publicationSearch from './publicationSearch';

export default combineReducers({
    search: publicationSearch
});
