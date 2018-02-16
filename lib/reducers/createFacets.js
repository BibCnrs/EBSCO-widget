import _ from 'lodash';

import parseFacetData from '../services/parseFacetData';
import uncapitalizeKeys from '../services/uncapitalizeKeys';
import {
    A2Z_SEARCH,
    SEARCH_SUCCESS,
    CLEAR_FACET,
    CHANGE_FACET,
    LOGOUT,
    DOMAIN_CHANGE,
    LINKED_SEARCH,
    RESTORE_HISTORY,
    RELOAD_HISTORY,
} from '../actions';

export const defaultState = {
    active: {},
    available: [],
};

const createFacets = category => (state = defaultState, action) => {
    if (action.category !== category && action.type !== LOGOUT) {
        return state;
    }

    switch (action.type) {
        case SEARCH_SUCCESS:
            if (action.response.totalHits === 0) {
                return {
                    ...state,
                    available: uncapitalizeKeys(action.response.facets) || [],
                };
            }
            return {
                available: uncapitalizeKeys(action.response.facets) || [],
                active: action.response.activeFacets || {},
            };
        case LOGOUT:
        case DOMAIN_CHANGE:
        case A2Z_SEARCH:
            return defaultState;
        case LINKED_SEARCH:
        case CLEAR_FACET:
            return {
                ...state,
                active: {},
            };
        case CHANGE_FACET: {
            const { id, value, checked } = action;
            const prevValues = state.active[id] || [];
            const values = checked
                ? [...prevValues, value]
                : _.without(prevValues, value);

            return {
                ...state,
                active: {
                    ...state.active,
                    [id]: values,
                },
            };
        }
        case RESTORE_HISTORY:
        case RELOAD_HISTORY:
            return {
                available: [],
                active: action.query.activeFacets,
            };
        default:
            return state;
    }
};

export default createFacets;

export const getActiveFacetValues = ({ active = {} }) => {
    return Object.keys(active).reduce((result, id) => {
        return [
            ...result,
            ...active[id].map(value => {
                return { id, value, checked: true };
            }),
        ];
    }, []);
};

export const getActiveFacet = state => state && state.active;
export const hasActiveFacet = state =>
    Object.keys(state.active || {}).length > 0;

export const getFacetData = state => {
    if (!state) {
        return;
    }
    return parseFacetData(state.available || [], state.active || {});
};
