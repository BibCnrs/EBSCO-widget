import {
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    TERM_CHANGE,
    LOGIN_SUCCESS,
    LOGOUT,
    DOMAIN_CHANGE,
    RELOAD_HISTORY
} from '../actions';
import limiters, { defaultState as limitersDefaultState } from './limiters';

export const getDefaultState = (term, domain) => {
    const domains = JSON.parse(window.sessionStorage.getItem('domains')) || [];
    domain = domains.indexOf(domain) !== -1 ? domain : null;
    return {
        term: term || '',
        status: 'NONE',
        domain: domain || domains[0],
        limiters: limitersDefaultState
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
                error: undefined,
                searchedTerm: undefined,
                status: 'PENDING'
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                error: undefined,
                status: 'SUCCESS',
                searchedTerm: state.term
            };
        case SEARCH_ERROR:
            return {
                ...state,
                status: 'ERROR',
                searchedTerm: undefined,
                error: action.error.message
            };
        case RELOAD_HISTORY:
            return action.query;
        default:
            return {
                ...state,
                limiters: limiters(state.limiters, action)
            };
        }
    };
}
