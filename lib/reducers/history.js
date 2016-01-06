import {
    SEARCH_SUCCESS,
    LOGOUT
} from '../actions';

export const getHistoryFromStorage = function () {
    return Array
    .apply(null, Array(window.localStorage.length))
    .map((_, index) => window.localStorage.key(index)) // all key in localStorage
    .filter((key) => key.lastIndexOf('query', 0) === 0) // that start with query
    .map((key) => JSON.parse(key.replace('query', ''))); // and parse them
};

export default function history(state = getHistoryFromStorage() ||  [], action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        return state.some((query) => JSON.stringify(query) === JSON.stringify(action.query)) ? state : [
            ...state,
            action.query
        ];
    case LOGOUT:
        return [];
    default:
        return state;
    }
}
