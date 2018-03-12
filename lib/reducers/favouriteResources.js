import {
    LOGIN_SUCCESS,
    LOGOUT,
    ADD_FAVOURITE_RESOURCE,
    REMOVE_FAVOURITE_RESOURCE,
} from '../actions';

export const defaultState = [];

export default function favouriteResources(state = defaultState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.response.favouriteResources || [];
        case ADD_FAVOURITE_RESOURCE:
            return [action.resource, ...state];
        case REMOVE_FAVOURITE_RESOURCE:
            return state.filter(({ url }) => url !== action.url);
        case LOGOUT:
            return [];
        default:
            return state;
    }
}

export const isResourceAdded = (state, resourceUrl) =>
    !!state.find(({ url }) => url === resourceUrl);
