import _ from 'lodash';

import parseFacetData from '../services/parseFacetData';
import uncapitalizeKeys from '../services/uncapitalizeKeys';
import {
    SEARCH_SUCCESS,
    CLEAR_FACET,
    CHANGE_FACET,
    LOGOUT,
    LINKED_SEARCH,
    RESTORE_HISTORY,
    RELOAD_HISTORY
} from '../actions';

export const defaultState = {
    active: {},
    available: []
};

const createFacets = (category) => (state = defaultState, action) => {
    if (action.category !== category) {
        return state;
    }

    switch (action.type) {
    case SEARCH_SUCCESS:
        return {
            available: uncapitalizeKeys(action.response.facets)  || [],
            active: action.response.activeFacets || {}
        };
    case LOGOUT:
    case LINKED_SEARCH:
    case CLEAR_FACET:
        return {
            ...state,
            activeFacets: {}
        };
    case CHANGE_FACET: {
        const { id, value, checked } = action;
        const prevValues = state[id] || [];
        const values = checked ?
            [ ...prevValues, value ]
        :
            _.without(prevValues, value)
        ;

        return {
            ...state,
            active: {
                ...state.active,
                [id]: values
            }
        };
    }
    case RESTORE_HISTORY:
    case RELOAD_HISTORY:
        return {
            available: [],
            active: action.query.activeFacets
        };
    default:
        return state;
    }
};

export default createFacets;

export const getActiveFacetValues = (state) => {
    return Object.keys(state.active).reduce((result, id) => {
        return [
            ...result,
            ...state.active[id].map(value => {
                return { id, value, checked: true };
            })
        ];
    }, []);
};

export const getFacetData = (state) => {
    return parseFacetData(state.available, state.active);
};
