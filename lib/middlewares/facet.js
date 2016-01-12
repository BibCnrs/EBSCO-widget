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
                state.search.facets[action.name].clear
            ));
        }

        if(newFacetValues.length === currentFacetValues.length + 1) {
            return store.dispatch(actions.triggerEbscoAction(
                newFacetValues.slice(-1)[0]
            ));
        }

        if(newFacetValues.length === currentFacetValues.length - 1) {
            const deletedValue = currentFacetValues
            .find((value) => (newFacetValues.indexOf(value) === -1));

            return store.dispatch(actions.triggerEbscoAction(deletedValue));
        }
    }
};
