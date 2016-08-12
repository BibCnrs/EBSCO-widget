import {
    SET_ALL_DOMAINS,
    DOMAIN_CHANGE,
    LOGIN_SUCCESS,
    RESTORE_HISTORY,
    RELOAD_HISTORY,
    LOGOUT
} from '../actions';

export const defaultState = {
    all: [],
    available: [],
    article: null,
    publication: null,
    a2z: null,
    defaultDomain: null
};

export const isDomainAvailable = (state, location) => state.available.indexOf(state[location]) !== -1;

export const getDefaultDomain = (state, location) => {
    if(location === 'article') {
        return state.available.indexOf(state.defaultDomain) !== -1 ? state.defaultDomain : state.available[0];
    }

    return state.all.indexOf(state.defaultDomain) !== -1 ? state.defaultDomain : state.all[0];
};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case SET_ALL_DOMAINS: {
        const intermediaryState = {
            ...state,
            all: action.domains
        };
        return {
            ...intermediaryState,
            publication: getDefaultDomain(intermediaryState, 'publication'),
            a2z: getDefaultDomain(intermediaryState, 'a2z')
        };
    }
    case LOGIN_SUCCESS: {
        const intermediaryState = {
            ...state,
            available: action.response.domains
        };
        return {
            ...intermediaryState,
            article: getDefaultDomain(intermediaryState, 'article')
        };
    }
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
