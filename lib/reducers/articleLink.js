import {
    RETRIEVE_LINK_SUCCESS,
    SEARCH_SUCCESS,
    LOGOUT
} from '../actions';

const defaultState = {};

export default (state = defaultState, action) => {
    switch(action.type) {
    case SEARCH_SUCCESS:
        if (action.category !== 'article') {
            return state;
        }
        return action.response.results.reduce((nextState, record) => {
            return {
                ...nextState,
                [record.id]: record.articleLink
            };
        }, state);
    case RETRIEVE_LINK_SUCCESS:
        return {
            ...state,
            [action.id]: action.response.url
        };
    case LOGOUT:
        return defaultState;
    default:
        return state;
    }
};

export const getById = (state, id) => {
    return state[id];
};
