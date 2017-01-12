import {
    API_LOAD_HISTORY_PAGE_SUCCESS,
    DELETE_HISTORY,
    LOGOUT,
    SEARCH_SUCCESS,
    SET_HISTORY,
} from '../actions';

export const getQueryIndex = (actionQuery, state) => state.queries.findIndex((query) => {
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

export const defaultState = {
    queries: [],
    currentPage: 1,
    maxPage: 1,
    totalcount: 0,
};

export default function history(state = defaultState, action) {
    switch (action.type) {
    case API_LOAD_HISTORY_PAGE_SUCCESS: {
        const [firstHistory] = action.history;
        if (firstHistory) {
            const result = {
                ...state,
                maxPage: Math.ceil(parseInt(firstHistory.totalcount) / 20),
                queries: action.history.map(h => h.event),
            };

            return result;
        }
        return {
            ...state,
            queries: action.history,
        };
    }
    case SET_HISTORY:
        return action.value;
    case SEARCH_SUCCESS: {
        if(action.category !== 'article') {
            return state;
        }
        if(action.response.totalHits === 0) {
            return state;
        }
        const newQuery = {
            ...action.query,
            activeFacets: action.response.activeFacets || []
        };
        let index = getQueryIndex(newQuery, state);

        if (index === -1) {
            return {
                ...state,
                queries: [
                    {
                        ...newQuery,
                        totalHits: action.response.totalHits
                    },
                    ...state.queries
                ],
            };
        }

        return {
            ...state,
            queries: [
                ...state.queries.slice(0, index),
                {
                    ...newQuery,
                    totalHits: action.response.totalHits
                },
                ...state.queries.slice(index + 1)
            ],
        };
    }
    case LOGOUT:
        return defaultState;
    case DELETE_HISTORY: {
        const index = getQueryIndex(action.query, state);

        if (index === -1) {
            return state;
        }

        return {
            ...state,
            queries: [
                ...state.queries.slice(0, index),
                ...state.queries.slice(index + 1)
            ],
        };
    }
    default:
        return state;
    }
}

export const hasHistory = (state) => state.queries.length > 0;
