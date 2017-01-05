import _ from 'lodash';

import getSha1 from '../services/getSha1';

import {
    LOGOUT,
    ADD_QUERY,
    REMOVE_QUERY,
    CHANGE_QUERY,
    CHANGE_TERM,
    RELOAD_HISTORY,
    RESTORE_HISTORY,
    A2Z_SEARCH,
    LINKED_SEARCH,
    SUGGEST_TERMS,
    SEARCH,
    SEARCH_SUCCESS,
    CLEAR_AUTOCOMPLETE,
    EXACT_MATCH_SEARCH
} from '../actions';
import { availableFields } from '../config/article';

export const defaultQuery = {
    article: {
        boolean: 'AND',
        term: '',
        suggestedTerms: [],
        field: null,
        key: 'initial'
    },
    publication: {
        boolean: 'AND',
        term: '',
        suggestedTerms: [],
        field: null,
        key: 'initial'
    }
};

export const defaultState = {
    article: [defaultQuery['article']],
    publication: [defaultQuery['publication']]
};

const createQueryList = (category) => (state = defaultState[category], action) => {
    if(action.category !== category && action.type !== LOGOUT) {
        return state;
    }
    const { index } = action;
    switch (action.type) {
    case ADD_QUERY:
        return [
            ...state.slice(0, index + 1)
            .map(query => ({ ...query, suggestedTerms: [] })),
            {
                ...defaultQuery[category],
                key: getSha1(state)
            },
            ...state.slice(index + 1)
            .map(query => ({ ...query, suggestedTerms: [] }))
        ];
    case REMOVE_QUERY:
        if (state.length === 1) {
            return state;
        }
        return [
            ...state.slice(0, index)
            .map(query => ({ ...query, suggestedTerms: [] })),
            ...state.slice(index + 1)
            .map(query => ({ ...query, suggestedTerms: [] }))
        ];
    case CHANGE_QUERY:
        return [
            ...state.slice(0, index)
            .map(query => ({ ...query, suggestedTerms: [] })),
            {
                ...state[index],
                [action.key]: action.value
            },
            ...state.slice(index + 1)
            .map(query => ({ ...query, suggestedTerms: [] }))
        ];
    case CHANGE_TERM:
        return [
            ...state.slice(0, index)
            .map(query => ({ ...query, suggestedTerms: [] })),
            {
                ...state[index],
                term: action.term,
                suggestedTerms: []
            },
            ...state.slice(index + 1)
            .map(query => ({ ...query, suggestedTerms: [] }))
        ];
    case SUGGEST_TERMS:
        return [
            ...state.slice(0, index),
            {
                ...state[index],
                suggestedTerms: action.terms
            },
            ...state.slice(index + 1)
        ];
    case RESTORE_HISTORY:
    case RELOAD_HISTORY:
        return action.query.queries;
    case A2Z_SEARCH:
        return [
            {
                ...state[0],
                field: 'TI'
            }
        ];
    case LINKED_SEARCH:
        if (availableFields.indexOf(action.field) === -1) {
            return [
                { boolean: 'AND', term: `${action.field} ${action.term}`, field: null }
            ];
        }

        return [
            { boolean: 'AND', term: action.term, field: action.field }
        ];
    case SEARCH:
    case SEARCH_SUCCESS:
    case CLEAR_AUTOCOMPLETE:
        return state.map(query => ({
            ...query,
            suggestedTerms: []
        }));
    case EXACT_MATCH_SEARCH:
        return [{
            ...defaultQuery[category],
            term: action.term
        }];
    case LOGOUT:
        return defaultState[category];
    default:
        return state;
    }
};

export default createQueryList;

export const getQueryListQueries = (state) => state;

export const getQueryListLetters = (state) => {
    const { term } = state[0];

    return {
        firstLetter: term && term[0] || '',
        secondLetter: term && term[1] || ''
    };
};

export const getQueryListTerm = (state, index = 0) => {
    return state[index] && state[index].term;
};

export const getExactMatchQuery = (state) => {
    return state
    .filter(query => !query.field || query.field === 'TI');
};

export const canExactMatch = (state) =>
    getExactMatchQuery(state).length > 0;

export const getQueryListSuggestedTerms = (state, index = 0) => {
    return state[index] && state[index].suggestedTerms;
};

export const getQueryListBoolean = (state, index = 0) => {
    return state[index] && state[index].boolean;
};

export const getQueryListField = (state, index = 0) => state[index] && state[index].field;

export const isQueryReady = (state) => _.every(state, query => query.term.length > 0);

export const isQueryListInA2zMode = (state) =>
    state.length === 1 &&
    state[0].field === 'TI' &&
    !!state[0].term.match(/^(([A-Z]([A-Z])?\*)|(0\* OR 1\* OR 2\* OR 3\* OR 4\* OR 5\* OR 6\* OR 7\* OR 8\* OR 9\*))$/);
