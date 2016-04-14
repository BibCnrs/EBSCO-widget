import {
    LOGIN_SUCCESS,
    LOGOUT,
    SET_AVAILABLE_DOMAINS
} from '../actions';

import {
    CHANGE_TERM,
    DOMAIN_CHANGE,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    CHANGE_SORT,
    CHANGE_FIELD
} from '../actions/publication';

import publicationLimiters, { defaultState as publicationLimitersDefaultState } from './publicationLimiters';
import activeFacets, { defaultState as activeFacetsDefaultState } from './publicationActiveFacets';

export const defaultState = {
    term: '',
    field: null,
    status: 'NONE',
    domain: null,
    availableDomains: [],
    limiters: publicationLimitersDefaultState,
    activeFacets: activeFacetsDefaultState,
    sort: 'relevance'
};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case SET_AVAILABLE_DOMAINS:
        return {
            ...state,
            availableDomains: action.value,
            domain: action.value[0]
        };
    case LOGIN_SUCCESS:
        return {
            ...state,
            domain: action.response.domains[0],
            availableDomains: action.response.domains
        };
    case LOGOUT:
        return defaultState;
    case CHANGE_TERM:
        return {
            ...state,
            term: action.term
        };
    case DOMAIN_CHANGE:
        if (state.availableDomains.indexOf(action.domain) === -1) {
            return state;
        }
        return {
            ...state,
            domain: action.domain
        };
    case SEARCH_PENDING:
        return {
            ...state,
            status: 'PENDING'
        };
    case SEARCH_SUCCESS:
        return {
            ...state,
            activeFacets: activeFacets(state.activeFacets, action),
            status: 'DONE'
        };
    case SEARCH_ERROR:
        return {
            ...state,
            status: 'DONE'
        };
    case CHANGE_SORT: {
        return {
            ...state,
            sort: action.value
        };
    }
    case CHANGE_FIELD: {
        return {
            ...state,
            field: action.value
        };
    }
    default:
        return {
            ...state,
            limiters: publicationLimiters(state.limiters, action),
            activeFacets: activeFacets(state.activeFacets, action)
        };
    }
}
