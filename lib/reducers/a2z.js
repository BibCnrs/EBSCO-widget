import { combineReducers } from 'redux';

import a2zSearch from './a2zSearch';
import a2zSearchResult from './a2zSearchResult';

export default combineReducers({
    search: a2zSearch,
    searchResult: a2zSearchResult
});
