import getSha1 from '../services/getSha1';

import {
    ADD_QUERY,
    REMOVE_QUERY,
    CHANGE_QUERY,
    LINKED_SEARCH
} from '../actions';

export const defaultArticleQuery = {
    boolean: 'AND',
    term: '',
    field: null,
    key: 'initial'
};

export const defaultState = [defaultArticleQuery];

export default function articleQueryList(state = defaultState, action) {
    if(action.category !== 'article') {
        return state;
    }
    const { index } = action;
    switch (action.type) {
    case ADD_QUERY:
        return [
            ...state.slice(0, index + 1),
            {
                ...defaultArticleQuery,
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
    case LINKED_SEARCH:
        return [
            { boolean: 'AND', term: action.term, field: action.field }
        ];
    default:
        return state;
    }
}
