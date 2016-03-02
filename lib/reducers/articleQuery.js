
import {
    CHANGE_QUERY_TERM,
    CHANGE_QUERY_FIELD,
    CHANGE_QUERY_BOOLEAN
} from '../actions/article';



export const defaultState = {
    boolean: 'AND',
    term: '',
    field: null
};

export default function articleQuery(state = defaultState, action) {
    switch (action.type) {
    case CHANGE_QUERY_TERM:
        return {
            ...state,
            term: action.value
        };
    case CHANGE_QUERY_FIELD:
        return {
            ...state,
            field: action.value
        };
    case CHANGE_QUERY_BOOLEAN:
        return {
            ...state,
            boolean: action.value
        };
    default:
        return defaultState;
    }
}
