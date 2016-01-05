import { Map, fromJS } from 'immutable';
import {
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    TERM_CHANGE,
    LOGIN_SUCCESS,
    LOGOUT,
    DOMAIN_CHANGE
} from '../actions';
import limiters, { defaultState as limitersDefaultState } from './limiters';

export const getDefaultState = (term, domain) => {
    const domains = JSON.parse(window.sessionStorage.getItem('domains')) || [];
    domain = domains.indexOf(domain) !== -1 ? domain : null;
    return Map({
        term: term || '',
        status: 'NONE',
        domain: domain || domains[0],
        limiters: limitersDefaultState
    });
};

export default function (term, domain) {
    return function search(state = getDefaultState(term, domain), action) {
        state = fromJS(state);
        switch (action.type) {
        case LOGIN_SUCCESS:
            return state
            .set('domain', action.response.domains[0]);
        case LOGOUT:
            return getDefaultState();
        case TERM_CHANGE:
            return state
            .set('term', action.term);
        case DOMAIN_CHANGE:
            return state
            .set('domain', action.domain)
            .delete('searchedTerm');
        case SEARCH_PENDING:
            return state
            .delete('error')
            .delete('searchedTerm')
            .set('status', 'PENDING');
        case SEARCH_SUCCESS:
            return state
            .delete('error')
            .set('status', 'SUCCESS')
            .set('searchedTerm', state.get('term'));
        case SEARCH_ERROR:
            return state
            .set('status', 'ERROR')
            .delete('searchedTerm')
            .set('error', action.error.message);
        default:
            return state.set('limiters', limiters(state.get('limiters'), action));
        }
    };
}
