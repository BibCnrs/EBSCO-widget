import {
    LOGIN_SUCCESS,
    LOGOUT,
    RELOAD_HISTORY,
    RESTORE_HISTORY
} from '../actions';

import {
    CHANGE_TERM,
    DOMAIN_CHANGE,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    RESET,
    CHANGE_SORT,
    CHANGE_FIELD
} from '../actions/article';


import articleLimiters, { defaultState as articleLimitersDefaultState } from './articleLimiters';
import activeFacets, { defaultState as activeFacetsDefaultState } from './articleActiveFacets';

export const getDefaultState = (term, domain) => {
    const domains = JSON.parse(window.sessionStorage.getItem('domains')) || [];
    domain = domains.indexOf(domain) !== -1 ? domain : null;
    return {
        term: term || '',
        field: null,
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
                label: `date de publication décroissante`,
                value: 'date'
            }, {
                label: `date de publication croissante`,
                value: 'date2'
            }
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
        case CHANGE_TERM:
            return {
                ...state,
                term: action.term
            };
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
        case RESET: {
            return {
                ...state,
                limiters: articleLimiters(state.limiters, action),
                activeFacets: activeFacets(state.activeFacets, action),
                sort: 'relevance'
            };
        }
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