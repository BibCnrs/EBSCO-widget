import {
    LOGIN_SUCCESS,
    LOGOUT,
    RELOAD_HISTORY,
    RESTORE_HISTORY
} from '../actions';

import {
    DOMAIN_CHANGE,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    RESET,
    CHANGE_SORT
} from '../actions/article';

import articleLimiters, { defaultState as articleLimitersDefaultState } from './articleLimiters';
import activeFacets, { defaultState as activeFacetsDefaultState } from './articleActiveFacets';
import articleQueryList, { defaultState as articleQueryListDefaultState } from './articleQueryList';

export const getDefaultState = (term, domain) => {
    const domains = JSON.parse(window.sessionStorage.getItem('domains')) || [];
    domain = domains.indexOf(domain) !== -1 ? domain : null;
    return {
        queries: articleQueryListDefaultState,
        availableFields: [
            {
                label: 'Tout',
                value: null
            }, {
                label: `Auteur`,
                value: 'AU'
            }, {
                label: `Titre`,
                value: 'TI'
            }, {
                label: `Sujet`,
                value: 'SU'
            }, {
                label: `Source`,
                value: 'S0'
            }, {
                label: `Résumé`,
                value: 'AB'
            }, {
                label: `ISSN`,
                value: 'IS'
            }, {
                label: `ISBN`,
                value: 'IB'
            }
        ],
        status: 'NONE',
        domain: domain || domains[0],
        limiters: articleLimitersDefaultState,
        activeFacets: activeFacetsDefaultState,
        sort: 'relevance',
        availableSort: [
            {
                label: 'pertinence',
                value: 'relevance'
            }, {
                label: `date (récent - ancien)`,
                value: 'date'
            }, {
                label: `date (ancien - récent)`,
                value: 'date2'
            }
        ],
        availableBoolean: [
            'AND',
            'OR',
            'NOT'
        ]
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
        case DOMAIN_CHANGE:
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
        case RESET:
            return {
                ...state,
                limiters: articleLimiters(state.limiters, action),
                activeFacets: activeFacets(state.activeFacets, action),
                queries: articleQueryList(state.queries, action),
                sort: 'relevance'
            };
        case CHANGE_SORT:
            return {
                ...state,
                sort: action.value
            };
        case RESTORE_HISTORY:
        case RELOAD_HISTORY:
            return action.query;
        default:
            return {
                ...state,
                limiters: articleLimiters(state.limiters, action),
                activeFacets: activeFacets(state.activeFacets, action),
                queries: articleQueryList(state.queries, action)
            };
        }
    };
}
