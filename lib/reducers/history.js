import {
    SEARCH_SUCCESS,
    LOGOUT,
    DELETE_HISTORY
} from '../actions';

export const getHistoryFromStorage = function () {
    return JSON.parse(window.localStorage.getItem('history')) || [];
};

export const getQueryIndex = (actionQuery, state) => state.findIndex((query) => {
    return JSON.stringify({
        ...query,
        totalHits: undefined
    }) === JSON.stringify({
        ...actionQuery,
        totalHits: undefined
    });
});

export default function history(state = getHistoryFromStorage(), action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        let index = getQueryIndex(action.query, state);

        if (index === -1) {
            return [
                {
                    ...action.query,
                    totalHits: action.response.totalHits
                },
                ...state
            ];
        }

        return [
            ...state.slice(0, index),
            {
                ...action.query,
                totalHits: action.response.totalHits
            },
            ...state.slice(index + 1)
        ];
    case LOGOUT:
        return [];
    case DELETE_HISTORY:
        index = getQueryIndex(action.query, state);

        if (index === -1) {
            return state;
        }

        return [
            ...state.slice(0, index),
            ...state.slice(index + 1)
        ];
    default:
        return state;
    }
}
