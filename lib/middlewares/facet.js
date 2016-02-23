import actions, { APPLY_FACET } from '../actions';

export default store => next => action => facet(store, next, action);

export const facet = function facet(store, next, action) {
    next(action);
    const state = store.getState();
    switch(action.type) {
    case APPLY_FACET:
        const newFacetValues = state.article.facets[action.name].newValues.map((v) => v.value);
        const currentFacetValues = state.article.facets[action.name].values.map((v) => v.value);
        if (currentFacetValues.length && newFacetValues.length === 0) {
            return store.dispatch(actions.triggerEbscoAction(
                `removefacetfilter(${state.article.facets[action.name].filterId})`
            ));
        }

        if(newFacetValues.length > currentFacetValues.length) {
            const newFacets = newFacetValues
            .filter((value) => currentFacetValues.indexOf(value) < 0)
            .map(value => `${action.name}:${value}`)
            .join(',');
            const ebscoAction = state.article.facets[action.name].filterId ?
            `addfacetfilter(${state.article.facets[action.name].filterId},${newFacets})`
            :
            `addfacetfilter(${newFacets})`;

            return store.dispatch(actions.triggerEbscoAction(ebscoAction));
        }

        if(newFacetValues.length < currentFacetValues.length) {
            const deletedFacets = currentFacetValues
            .filter((value) => newFacetValues.indexOf(value) < 0)
            .map(value => `${action.name}:${value}`)
            .join(',');

            const ebscoAction = `removefacetfiltervalue(${state.article.facets[action.name].filterId},${deletedFacets})`;

            return store.dispatch(actions.triggerEbscoAction(ebscoAction));
        }
    }
};
