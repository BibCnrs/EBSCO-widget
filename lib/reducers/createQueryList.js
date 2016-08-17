import _ from 'lodash';

import getSha1 from '../services/getSha1';

import {
    LOGOUT,
    ADD_QUERY,
    REMOVE_QUERY,
    CHANGE_QUERY,
    RELOAD_HISTORY,
    RESTORE_HISTORY,
    LINKED_SEARCH
} from '../actions';
import { availableFields } from '../config/article';

export const defaultQuery = {
    article: {
        boolean: 'AND',
        term: '',
        field: null,
        key: 'initial'
    },
    publication: {
        boolean: 'AND',
        term: '',
        field: null,
        key: 'initial'
    },
    a2z: {
        boolean: 'AND',
        term: '',
        field: 'JN',
        key: 'initial'
    }
};

export const defaultState = {
    article: [defaultQuery['article']],
    publication: [defaultQuery['publication']],
    a2z: [defaultQuery['a2z']]
};

const createQueryList = (category) => (state = defaultState[category], action) => {
    if(action.category !== category && action.type !== LOGOUT) {
        return state;
    }

    const { index } = action;
    switch (action.type) {
    case ADD_QUERY:
        return [
            ...state.slice(0, index + 1),
            {
                ...defaultQuery[category],
                key: getSha1(state)
            },
            ...state.slice(index + 1)
        ];
    case REMOVE_QUERY:
        if (state.length === 1) {
            return state;
        }
        return [
            ...state.slice(0, index),
            ...state.slice(index + 1)
        ];
    case CHANGE_QUERY:
        return [
            ...state.slice(0, index),
            {
                ...state[index],
                [action.key]: action.value
            },
            ...state.slice(index + 1)
        ];
    case RESTORE_HISTORY:
    case RELOAD_HISTORY:
        return action.query.queries;
    case LINKED_SEARCH:
        if (availableFields.indexOf(action.field) === -1) {
            return [
                { boolean: 'AND', term: `${action.field} ${action.term}`, field: null }
            ];
        }

        return [
            { boolean: 'AND', term: action.term, field: action.field }
        ];
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

export const getQueryListBoolean = (state, index = 0) => {
    return state[index] && state[index].boolean;
};

export const getQueryListField = (state, index = 0) => state[index] && state[index].field;

export const isQueryReady = (state) => _.every(state, query => query.term.length > 0);
