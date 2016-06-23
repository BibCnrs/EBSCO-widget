import { combineReducers } from 'redux';

import createSearch, * as fromSearch from './createSearch';

export default combineReducers({
    article: createSearch('article'),
    a2z: createSearch('a2z'),
    publication: createSearch('publication')
});

export const getResultPerPage = (state, category) => {
    return fromSearch.getResultPerPage(state[category]);
};
