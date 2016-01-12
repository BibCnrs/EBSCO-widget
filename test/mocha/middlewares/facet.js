import { facet } from '../../../lib/middlewares/facet';
import {
    CHANGE_FACET,
    TRIGGER_EBSCO_ACTION
} from '../../../lib/actions';

describe('facet middleware', function () {
    let store, dispatchedAction, next, nextAction;
    let state;

    beforeEach(function () {
        dispatchedAction = [];
        state = {
            search: {
                facets: {
                    Language: {
                        label: 'Language',
                        values: [],
                        choices: [],
                        clear: 'removeFacet(1)'
                    }
                }
            }
        };
        store = {
            getState: function () {
                return state;
            },
            dispatch: function (action) {
                dispatchedAction.push(action);
            }
        };
        nextAction = [];
        next = function (action) {
            nextAction.push(action);
        };
    });

    describe('action: CHANGE_FACET', function () {
        it('should trigger TRIGGER_EBSCO_ACTION with removeFacet(<facetId>) action when action.facets is []', function () {
            facet(store, next, {
                type: CHANGE_FACET,
                name: 'Language',
                newValues: [],
                currentValues: [
                    {
                        label: 'french',
                        value: 'removeFacetValue(Language:french)'
                    }, {
                        label: 'english',
                        value: 'removeFacetValue(Language:english)'
                    }
                ]
            });

            assert.deepEqual(dispatchedAction, [
                {
                    type: TRIGGER_EBSCO_ACTION,
                    value: 'removeFacet(1)'
                }
            ]);
        });

        it('should not trigger TRIGGER_EBSCO_ACTION action when action.facets is [] if corresponding facet value is already empty', function () {
            facet(store, next, {
                type: CHANGE_FACET,
                name: 'Language',
                newValues: [],
                currentValues: []
            });

            assert.deepEqual(dispatchedAction, []);
        });

        it('should trigger TRIGGER_EBSCO_ACTION action with addFacetValue(<new value>) when action.facets contain one more facet than state', function () {
            facet(store, next, {
                type: CHANGE_FACET,
                name: 'Language',
                newValues: [
                    {
                        label: 'english',
                        value: 'removeFacetValue(Language:english)'
                    }, {
                        label: 'french',
                        value: 'removeFacetValue(Language:french)'
                    }, {
                        label: 'deutsch',
                        value: 'addFacetValue(Language:deutsch)'
                    }
                ],
                currentValues:[
                    {
                        label: 'french',
                        value: 'removeFacetValue(Language:french)'
                    }, {
                        label: 'english',
                        value: 'removeFacetValue(Language:english)'
                    }
                ]
            });

            assert.deepEqual(dispatchedAction, [{
                type: TRIGGER_EBSCO_ACTION,
                value: 'addFacetValue(Language:deutsch)'
            }]);

        });

        it('should trigger TRIGGER_EBSCO_ACTION action with removeFacetValue(<removed value>) when action.facets contain one less facet than state', function () {
            facet(store, next, {
                type: CHANGE_FACET,
                name: 'Language',
                newValues: [ // french was removed
                    {
                        label: 'english',
                        value: 'removeFacetValue(Language:english)'
                    }
                ],
                currentValues: [
                    {
                        label: 'french',
                        value: 'removeFacetValue(Language:french)'
                    }, {
                        label: 'english',
                        value: 'removeFacetValue(Language:english)'
                    }
                ]
            });

            assert.deepEqual(dispatchedAction, [{
                type: TRIGGER_EBSCO_ACTION,
                value: 'removeFacetValue(Language:french)'
            }]);

        });
    });

});
