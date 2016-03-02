import {
    ADD_QUERY,
    REMOVE_QUERY,
    CHANGE_QUERY_TERM,
    CHANGE_QUERY_FIELD,
    CHANGE_QUERY_BOOLEAN
} from '../actions/article';

import articleQuery, { defaultState as defaultArticleQuery } from './articleQuery';

export const defaultState = [defaultArticleQuery];

export default function articleQueryList(state = defaultState, action) {
    const { index } = action;
    switch (action.type) {
    case ADD_QUERY:
        return [
            ...state.slice(0, index),
            defaultArticleQuery,
            ...state.slice(index)
        ];
    case REMOVE_QUERY:
        return [
            ...state.slice(0, index),
            ...state.slice(index + 1)
        ];
    case CHANGE_QUERY_TERM:
    case CHANGE_QUERY_FIELD:
    case CHANGE_QUERY_BOOLEAN:
        return [
            ...state.slice(0, index),
            articleQuery(state[index], action),
            ...state.slice(index + 1)
        ];
    default:
        return state;
    }
}
