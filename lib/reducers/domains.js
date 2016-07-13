import {
    SET_ALL_DOMAINS,
    DOMAIN_CHANGE,
    LOGIN_SUCCESS,
    API_LOGIN_SUCCESS,
    RESTORE_HISTORY,
    RELOAD_HISTORY,
    LOGOUT
} from '../actions';

export const defaultState = {
    all: [],
    available: [],
    article: null,
    publication: null,
    a2z: null
};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case SET_ALL_DOMAINS:
        return {
            ...state,
            all: action.domains,
            publication: action.domains[0],
            a2z: action.domains[0]
        };
    case LOGIN_SUCCESS:
    case API_LOGIN_SUCCESS:
        return {
            ...state,
            available: action.response.domains,
            article: action.response.domains[0]
        };
    case LOGOUT:
        return {
            ...state,
            available: [],
            article: null
        };
    case DOMAIN_CHANGE:
        if (action.category === 'article' && state.available.indexOf(action.domain) === -1) {
            return state;
        }
        return {
            ...state,
            [action.category]: action.domain
        };
    case RESTORE_HISTORY:
    case RELOAD_HISTORY:
        return {
            ...state,
            [action.category]: action.query.domain
        };
    default:
        return state;
    }
}

export const isDomainAvailable = (state, location) => state.available.indexOf(state [location]) !== -1;
