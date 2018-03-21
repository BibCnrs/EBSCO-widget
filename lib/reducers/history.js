import {
    API_LOAD_HISTORY_PAGE_SUCCESS,
    DELETE_HISTORY,
    LOGOUT,
    SEARCH_SUCCESS,
    SET_HISTORY,
    SAVE_ALERT,
    SAVE_ALERT_ERROR,
    REMOVE_ALERT,
} from '../actions';

export const getQueryIndex = (actionQuery, state) =>
    state.queries.findIndex(query => {
        return (
            JSON.stringify({
                ...query,
                totalHits: undefined,
                action: undefined,
            }) ===
            JSON.stringify({
                ...actionQuery,
                totalHits: undefined,
                action: undefined,
            })
        );
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
            return {
                ...state,
                queries: action.history.map(({ event, ...rest }) => ({
                    ...event,
                    ...rest,
                })),
                currentPage: action.page,
                maxPage: Math.ceil(parseInt(firstHistory.totalcount) / 5),
            };
        }
        case SET_HISTORY:
            return action.value;
        case SEARCH_SUCCESS: {
            if (action.category !== 'article') {
                return state;
            }
            if (action.response.totalHits === 0) {
                return state;
            }
            const newQuery = {
                ...action.query,
                activeFacets: action.response.activeFacets || [],
            };
            let index = getQueryIndex(newQuery, state);

            if (index === -1) {
                return {
                    ...state,
                    queries: [
                        {
                            ...newQuery,
                            totalHits: action.response.totalHits,
                        },
                        ...state.queries,
                    ],
                };
            }

            return {
                ...state,
                queries: [
                    ...state.queries.slice(0, index),
                    {
                        ...newQuery,
                        totalHits: action.response.totalHits,
                    },
                    ...state.queries.slice(index + 1),
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
                    ...state.queries.slice(index + 1),
                ],
            };
        }
        case SAVE_ALERT: {
            const index = state.queries.findIndex(
                ({ id }) => id === action.historyId,
            );
            return {
                ...state,
                queries: [
                    ...state.queries.slice(0, index),
                    {
                        ...state.queries[index],
                        hasAlert: true,
                        frequence: action.frequence,
                    },
                    ...state.queries.slice(index + 1),
                ],
            };
        }
        case REMOVE_ALERT:
        case SAVE_ALERT_ERROR: {
            const index = state.queries.findIndex(
                ({ id }) => id === action.historyId,
            );
            return {
                ...state,
                queries: [
                    ...state.queries.slice(0, index),
                    {
                        ...state.queries[index],
                        hasAlert: false,
                        frequence: 'none',
                    },
                    ...state.queries.slice(index + 1),
                ],
            };
        }
        default:
            return state;
    }
}

export const hasHistory = state => state.queries && state.queries.length > 0;
