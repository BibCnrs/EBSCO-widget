import {
    CHANGE_TERM,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    CHANGE_SORT,
    CHANGE_FIELD
} from '../actions/publication';

import publicationLimiters, { defaultState as publicationLimitersDefaultState } from './publicationLimiters';
import activeFacets, { defaultState as activeFacetsDefaultState } from './publicationActiveFacets';

export const defaultState = {
    term: '',
    field: null,
    status: 'NONE',
    limiters: publicationLimitersDefaultState,
    activeFacets: activeFacetsDefaultState,
    sort: 'relevance'
};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case CHANGE_TERM:
        return {
            ...state,
            term: action.term
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
