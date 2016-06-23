import { combineReducers } from 'redux';

import createFacets, * as fromActiveFacets from './createFacets';

export const defaultState = {};

export default combineReducers({
    article: createFacets('article'),
    publication: createFacets('publication')
});

export const getActiveFacetValues = (state, category) =>
    fromActiveFacets.getActiveFacetValues(state[category]);

export const getFacetData = (state, category) => {
    return fromActiveFacets.getFacetData(state[category]);
};
