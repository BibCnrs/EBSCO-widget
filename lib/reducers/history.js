import _ from 'lodash';
import {
    API_LOAD_HISTORY_PAGE_SUCCESS,
    API_PERSIST_HISTORY_SUCCESS,
    DELETE_HISTORY,
    LOGOUT,
    SEARCH_SUCCESS,
    SET_HISTORY,
    SAVE_ALERT,
    SAVE_ALERT_ERROR,
    REMOVE_ALERT,
    DISABLE_ALERT,
} from '../actions';

export const getQueryIndex = (actionQuery, state) => {
    const target = JSON.stringify(
        _.pick(actionQuery, ['queries', 'limiters', 'activeFacets']),
    );

    return state.queries.findIndex(query => {
        return (
            JSON.stringify(
                _.pick(query, ['queries', 'limiters', 'activeFacets']),
            ) === target
        );
    });
};

export const defaultState = {
    queries: [],
    currentPage: 1,
    maxPage: 1,
    totalCount: 0,
    totalCountSearch: 0,
    totalCountAlert: 0,
};

export default function history(state = defaultState, action) {
    switch (action.type) {
        case DISABLE_ALERT:
            return {
                ...state,
                queries: state.queries.map(query => {
                    if (query.id === action.historyId) {
                        return {
                            ...query,
                            active: !query.active,
                        };
                    }
                    return query;
                }),
            };
        case API_LOAD_HISTORY_PAGE_SUCCESS: {
            if (!action.history.length) {
                return {
                    ...state,
                    queries: [],
                    currentPage: action.page,
                    maxPage: 0,
                };
            }
            const [allHistory, allAlert] = action.history;
            let page = allHistory[0];
            if (allAlert && allAlert.length) {
                page = allAlert[0];
            }
            const queries = allAlert.length > 0 ? allAlert : allHistory;
            return {
                ...state,
                queries: (_.isArray(queries) ? queries : []).map(
                    ({ event, ...rest }) => ({
                        ...event,
                        ...rest,
                    }),
                ),
                currentPage: action.page,
                totalCountAlert: Number(
                    allAlert[0] ? allAlert[0].totalCount : 0,
                ),
                totalCountSearch: Number(
                    allHistory[0] ? allHistory[0].totalCount : 0,
                ),
                maxPage: Math.ceil(parseInt(page ? page.totalCount : 1) / 5),
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

            let totalCountSearch = Number(state.totalCountSearch);
            if (totalCountSearch > 0) {
                totalCountSearch--;
            }

            let totalCountAlert = Number(state.totalCountAlert);
            if (action.query.hasAlert === true && totalCountAlert > 0) {
                totalCountAlert--;
            }

            return {
                ...state,
                totalCountSearch: !_.isNaN(totalCountSearch)
                    ? totalCountSearch
                    : 0,
                totalCountAlert: !_.isNaN(totalCountAlert)
                    ? totalCountAlert
                    : 0,
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

            let totalCountAlert = Number(state.totalCountAlert);
            totalCountAlert++;

            return {
                ...state,
                totalCountAlert: !_.isNaN(totalCountAlert)
                    ? totalCountAlert
                    : 1,
                queries: [
                    ...state.queries.slice(0, index),
                    {
                        ...state.queries[index],
                        hasAlert: true,
                        active: true,
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
                        frequence: 'week',
                    },
                    ...state.queries.slice(index + 1),
                ],
            };
        }
        case API_PERSIST_HISTORY_SUCCESS: {
            let index = getQueryIndex(action.response.event, state);

            let totalCountSearch = Number(state.totalCountSearch);
            totalCountSearch++;

            return {
                ...state,
                totalCountSearch,
                queries: [
                    ...state.queries.slice(0, index),
                    {
                        ...state.queries[index],
                        id: action.response.id,
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
