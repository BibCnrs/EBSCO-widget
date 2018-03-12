import {
    CHANGE_FAVORITE_DOMAIN,
    HIDE_PROFILE,
    LOGIN_SUCCESS,
    UPDATE_PROFILE_CANCEL,
    UPDATE_PROFILE_ERROR,
    UPDATE_PROFILE_PENDING,
    UPDATE_PROFILE_SUCCESS,
    LOGOUT,
} from '../actions';

export const defaultState = {
    favorite_domain: null,
    username: null,
    status: 'NONE',
    origin: null,
};

export default function profile(state = defaultState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            const { id, favorite_domain, origin, username } = action.response;
            return { ...state, id, username, favorite_domain, origin };
        }
        case CHANGE_FAVORITE_DOMAIN:
            return { ...state, favorite_domain: action.value };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                status: 'SUCCESS',
            };
        case UPDATE_PROFILE_PENDING:
            return {
                ...state,
                status: 'PENDING',
            };
        case UPDATE_PROFILE_CANCEL:
            return {
                ...state,
                status: 'NONE',
            };
        case UPDATE_PROFILE_ERROR:
            return {
                ...state,
                status: 'ERROR',
            };
        case HIDE_PROFILE:
            return {
                ...state,
                status: 'NONE',
            };
        case LOGOUT:
            return defaultState;
        default:
            return state;
    }
}

export const getProfileId = state => state.id;
export const hasProfile = state => state.origin === 'janus';
