import {
    ARTICLE,
    LOGOUT,
    DELETE_HISTORY
} from '../actions';

export const getHistoryFromStorage = function () {
    return JSON.parse(window.localStorage.getItem('history')) || [];
};

export const getQueryIndex = (actionQuery, state) => state.findIndex((query) => {
    return JSON.stringify({
        ...query,
        totalHits: undefined,
        action: undefined
    }) === JSON.stringify({
        ...actionQuery,
        totalHits: undefined,
        action: undefined
    });
});

export default function history(state = getHistoryFromStorage(), action) {
    switch (action.type) {
    case ARTICLE.SEARCH_SUCCESS:
        const newQuery = {
            ...action.query,
            activeFacets: action.response.activeFacets || []
        };
        let index = getQueryIndex(newQuery, state);

        if (index === -1) {
            return [
                {
                    ...newQuery,
                    totalHits: action.response.totalHits
                },
                ...state
            ];
        }

        return [
            ...state.slice(0, index),
            {
                ...newQuery,
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
