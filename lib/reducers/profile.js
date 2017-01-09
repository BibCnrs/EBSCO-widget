import {
    CHANGE_FAVORITE_DOMAIN,
    HIDE_PROFILE,
    LOGIN_SUCCESS,
    UPDATE_PROFILE_CANCEL,
    UPDATE_PROFILE_ERROR,
    UPDATE_PROFILE_PENDING,
    UPDATE_PROFILE_SUCCESS,
} from '../actions';

export const defaultState = {
    favorite_domain: null,
    has_profile: false,
    username: null,
    status: 'NONE',
};

export default function profile(state = defaultState, action) {
    switch (action.type) {
    case LOGIN_SUCCESS: {
        const { favorite_domain, origin, username } = action.response;
        return { ...state, username, favorite_domain, has_profile: origin === 'janus' };
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
            status: 'PENDING'
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
    default:
        return state;
    }
}
