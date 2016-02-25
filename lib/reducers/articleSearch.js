import {
    ARTICLE,
    LOGIN_SUCCESS,
    LOGOUT,
    RELOAD_HISTORY,
    RESTORE_HISTORY
} from '../actions';
import articleLimiters, { defaultState as articleLimitersDefaultState } from './articleLimiters';
import activeFacets, { defaultState as activeFacetsDefaultState } from './articleActiveFacets';

export const getDefaultState = (term, domain) => {
    const domains = JSON.parse(window.sessionStorage.getItem('domains')) || [];
    domain = domains.indexOf(domain) !== -1 ? domain : null;
    return {
        term: term || '',
        defaultTerm: term,
        status: 'NONE',
        domain: domain || domains[0],
        limiters: articleLimitersDefaultState,
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
        case ARTICLE.CHANGE_TERM:
            return {
                ...state,
                term: action.term
            };
        case ARTICLE.DOMAIN_CHANGE:
            return {
                ...state,
                domain: action.domain
            };
        case ARTICLE.SEARCH_PENDING:
            return {
                ...state,
                status: 'PENDING'
            };
        case ARTICLE.SEARCH_SUCCESS:
            return {
                ...state,
                activeFacets: activeFacets(state.activeFacets, action),
                status: 'DONE'
            };
        case ARTICLE.SEARCH_ERROR:
            return {
                ...state,
                status: 'DONE'
            };
        case ARTICLE.RESET: {
            return {
                ...state,
                limiters: articleLimiters(state.limiters, action),
                activeFacets: activeFacets(state.activeFacets, action)
            };
        }
        case RESTORE_HISTORY:
        case RELOAD_HISTORY:
            return action.query;
        default:
            return {
                ...state,
                limiters: articleLimiters(state.limiters, action),
                activeFacets: activeFacets(state.activeFacets, action)
            };
        }
    };
}
