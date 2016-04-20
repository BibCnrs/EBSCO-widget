import {
    LOGIN_SUCCESS,
    LOGOUT,
    SET_AVAILABLE_DOMAINS
} from '../actions';

import {
    SEARCH_TERM,
    DOMAIN_CHANGE,
    SEARCH_PENDING,
    SEARCH_ERROR
} from '../actions/a2z';

export const defaultState = {
    term: '',
    field: 'TI',
    status: 'NONE',
    domain: null,
    sort: 'title',
    availableDomains: []
};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case SEARCH_TERM:
        return {
            ...state,
            queries: action.queries
        };
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
    case SEARCH_ERROR:
        return {
            ...state,
            status: 'DONE'
        };
    default:
        return state;
    }
}
