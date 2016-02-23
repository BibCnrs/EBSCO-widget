import {
    LOGIN_SUCCESS,
    LOGOUT,
    RESET
} from '../actions';

import {
    CHANGE_TERM,
    DOMAIN_CHANGE,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR
} from '../actions/publication';

import publicationLimiters, { defaultState as publicationLimitersDefaultState } from './publicationLimiters';
import activeFacets, { defaultState as activeFacetsDefaultState } from './activeFacets';

export const getDefaultState = () => {
    const domains = JSON.parse(window.sessionStorage.getItem('domains')) || [];
    return {
        term: '',
        defaultTerm: '',
        status: 'NONE',
        domain: domains[0],
        limiters: publicationLimitersDefaultState,
        activeFacets: activeFacetsDefaultState
    };
};

export default function search(state = getDefaultState(), action) {
    switch (action.type) {
    case LOGIN_SUCCESS:
        return {
            ...state,
            domain: action.response.domains[0]
        };
    case LOGOUT:
        return getDefaultState();
    case CHANGE_TERM:
        return {
            ...state,
            term: action.term
        };
    case DOMAIN_CHANGE:
        return {
            ...state,
            domain: action.domain,
            searchedTerm: undefined
        };
    case SEARCH_PENDING:
        return {
            ...state,
            searchedTerm: undefined,
            status: 'PENDING'
        };
    case SEARCH_SUCCESS:
        return {
            ...state,
            searchedTerm: state.term,
            activeFacets: activeFacets(state.activeFacets, action),
            status: 'DONE'
        };
    case SEARCH_ERROR:
        return {
            ...state,
            status: 'DONE'
        };
    case RESET: {
        return {
            ...state,
            searchedTerm: undefined,
            limiters: publicationLimiters(state.publicationLimiters, action),
            activeFacets: activeFacets(state.activeFacets, action)
        };
    }
    default:
        return {
            ...state,
            limiters: publicationLimiters(state.publicationLimiters, action),
            activeFacets: activeFacets(state.activeFacets, action)
        };
    }
}
