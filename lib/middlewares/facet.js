import actions, { CHANGE_FACET } from '../actions';

export default store => next => action => facet(store, next, action);

export const facet = function facet(store, next, action) {
    next(action);
    const state = store.getState();
    switch(action.type) {
    case CHANGE_FACET:
        const newFacetValues = action.newValues.map(v => v.value);
        const currentFacetValues = action.currentValues.map(v => v.value);
        if (currentFacetValues.length && newFacetValues.length === 0) {
            return store.dispatch(actions.triggerEbscoAction(
                `removefacetfilter(${state.facets[action.name].filterId})`
            ));
        }

        if(newFacetValues.length === currentFacetValues.length + 1) {
            const ebscoAction = state.facets[action.name].filterId ?
            `addfacetfilter(${state.facets[action.name].filterId},${action.name}:${newFacetValues.slice(-1)[0]})`
            :
            `addfacetfilter(${action.name}:${newFacetValues.slice(-1)[0]})`;

            return store.dispatch(actions.triggerEbscoAction(ebscoAction));
        }

        if(newFacetValues.length === currentFacetValues.length - 1) {
            const deletedValue = currentFacetValues
            .find((value) => (newFacetValues.indexOf(value) === -1));

            return store.dispatch(
                actions.triggerEbscoAction(`removefacetfiltervalue(${state.facets[action.name].filterId},${action.name}:${deletedValue})`)
            );
        }
    }
};
