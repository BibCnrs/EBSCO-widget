import {
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    TERM_CHANGE,
    LOGIN_SUCCESS,
    LOGOUT,
    DOMAIN_CHANGE,
    RELOAD_HISTORY,
    RESTORE_HISTORY
} from '../actions';
import limiters, { defaultState as limitersDefaultState } from './limiters';
import activeFacets, { defaultState as activeFacetsDefaultState } from './activeFacets';

export const getDefaultState = (term, domain) => {
    const domains = JSON.parse(window.sessionStorage.getItem('domains')) || [];
    domain = domains.indexOf(domain) !== -1 ? domain : null;
    return {
        term: term || '',
        status: 'NONE',
        domain: domain || domains[0],
        limiters: limitersDefaultState,
        activeFacets: activeFacetsDefaultState
    };
};

export default function (term, domain) {
    return function search(state = getDefaultState(term, domain), action) {
        switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                domain: action.response.domains[0]
            };
        case LOGOUT:
            return getDefaultState();
        case TERM_CHANGE:
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
        case RESTORE_HISTORY:
        case RELOAD_HISTORY:
            return action.query;
        default:
            return {
                ...state,
                limiters: limiters(state.limiters, action),
                activeFacets: activeFacets(state.activeFacets, action)
            };
        }
    };
}
