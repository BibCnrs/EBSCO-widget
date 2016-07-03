import { combineReducers } from 'redux';

import createSearch, * as fromSearch from './createSearch';

export default combineReducers({
    article: createSearch('article'),
    a2z: createSearch('a2z'),
    publication: createSearch('publication')
});

export const getSearchByLocation = (state, category) => state[category];

export const getSearchValueByName = fromSearch.getSearchValueByName;
