import {
    SEARCH_SUCCESS,
    LOGOUT
} from '../actions';

export const getHistoryFromStorage = function () {
    return JSON.parse(window.localStorage.getItem('history')) || [];
};

export default function history(state = getHistoryFromStorage(), action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        return state
        .some((query) => JSON.stringify({ ...query, totalHits: undefined }) === JSON.stringify({ ...action.query, totalHits: undefined })) ? state : [
            {
                ...action.query,
                totalHits: action.response.totalHits
            },
            ...state
        ];
    case LOGOUT:
        return [];
    default:
        return state;
    }
}
