import {
    ADD_QUERY,
    REMOVE_QUERY,
    CHANGE_QUERY,
    RESET
} from '../actions/article';

export const defaultArticleQuery = {
    boolean: 'AND',
    term: '',
    field: null
};

export const defaultState = [defaultArticleQuery];

export default function articleQueryList(state = defaultState, action) {
    const { index } = action;
    switch (action.type) {
    case ADD_QUERY:
        return [
            ...state.slice(0, index + 1),
            defaultArticleQuery,
            ...state.slice(index + 1)
        ];
    case REMOVE_QUERY:
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
    case RESET:
        return defaultState;
    default:
        return state;
    }
}