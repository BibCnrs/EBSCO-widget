import {
    LOGIN_SUCCESS,
    LOGOUT
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
} from '../actions/publication';

import publicationLimiters, { defaultState as publicationLimitersDefaultState } from './publicationLimiters';
import activeFacets, { defaultState as activeFacetsDefaultState } from './publicationActiveFacets';

export const getDefaultState = () => {
    const domains = JSON.parse(window.sessionStorage.getItem('domains')) || [];
    return {
        queries: [
            {
                term: '',
                field: null
            }
        ],
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
                label: `ISSN`,
                value: 'IS'
            }, {
                label: `ISBN`,
                value: 'IB'
            }, {
                label: `Resource`,
                value: 'PT'
            }, {
                label: `Editeur`,
                value: 'PB'
            }
        ],
        status: 'NONE',
        domain: domains[0],
        limiters: publicationLimitersDefaultState,
        activeFacets: activeFacetsDefaultState,
        sort: 'relevance',
        availableSort: [
            {
                label: 'pertinence',
                value: 'relevance'
            }, {
                label: 'titre (A à Z)',
                value: 'title'
            }, {
                label: `date (récent - ancien)`,
                value: 'date'
            }, {
                label: `date (ancien - récent)`,
                value: 'date2'
            }
        ]
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
            limiters: publicationLimiters(state.limiters, action),
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
    default:
        return {
            ...state,
            limiters: publicationLimiters(state.limiters, action),
            activeFacets: activeFacets(state.activeFacets, action)
        };
    }
}
