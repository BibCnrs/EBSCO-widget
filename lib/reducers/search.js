import { Map, fromJS } from 'immutable';
import { SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_ERROR, TERM_CHANGE, LOGIN_SUCCESS, DOMAIN_CHANGE } from '../actions';

export default function (term, currentDomain) {
    return function search(state = Map({
        term: term || '',
        status: 'NONE',
        currentDomain: currentDomain || window.sessionStorage.getItem('domains') ? JSON.parse(window.sessionStorage.getItem('domains'))[0] : '',
        domains: JSON.parse(window.sessionStorage.getItem('domains'))
    }), action) {
        state = fromJS(state);
        switch (action.type) {
        case LOGIN_SUCCESS:
            return state.set('domains', action.response.domains).set('currentDomain', action.response.domains[0]);
        case TERM_CHANGE:
            return state.set('term', action.term);
        case DOMAIN_CHANGE:
            return state.set('currentDomain', action.domain).delete('searchedTerm');
        case SEARCH_PENDING:
            return state.delete('error').delete('searchedTerm').set('status', 'PENDING');
        case SEARCH_SUCCESS:
            return state.delete('error').set('status', 'SUCCESS').set('searchedTerm', state.get('term'));
        case SEARCH_ERROR:
            return state.set('status', 'ERROR').delete('searchedTerm').set('error', action.error.message);
        default:
            return state;
        }
    };
}
