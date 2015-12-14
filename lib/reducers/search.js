import { Map, fromJS } from 'immutable';
import { SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_ERROR, TERM_CHANGE, LOGIN_SUCCESS, LOGOUT, DOMAIN_CHANGE } from '../actions';

export const getDefaultState = (term, currentDomain) => {
    const domains = JSON.parse(window.sessionStorage.getItem('domains')) || [];
    if (domains.indexOf(currentDomain) === -1) {
        currentDomain = null;
    }
    return Map({
        term: term || '',
        status: 'NONE',
        currentDomain: currentDomain || ( domains.length ? domains[0] : ''),
        domains
    });
};

export default function (term, currentDomain) {
    return function search(state = getDefaultState(term, currentDomain), action) {
        state = fromJS(state);
        switch (action.type) {
        case LOGIN_SUCCESS:
            return state
            .set('domains', action.response.domains)
            .set('currentDomain', action.response.domains[0]);
        case LOGOUT:
            return getDefaultState();
        case TERM_CHANGE:
            return state
            .set('term', action.term);
        case DOMAIN_CHANGE:
            return state
            .set('currentDomain', action.domain)
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
            return state;
        }
    };
}
