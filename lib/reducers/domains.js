import {
    FETCH_DOMAINS_SUCCESS,
    FETCH_DOMAINS_ERROR,
    FETCH_DOMAINS_PENDING,
    LOGIN,
    API_LOGIN_SUCCESS,
    LOGOUT,
    ARTICLE,
    PUBLICATION,
    A2Z
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
    case FETCH_DOMAINS_SUCCESS:
        return {
            ...state,
            all: action.response,
            publication: action.response[0],
            a2z: action.response[0]
        };
    case FETCH_DOMAINS_ERROR:
    case FETCH_DOMAINS_PENDING:
        return {
            ...state,
            all: []
        };
    case LOGIN:
        return {
            ...state,
            available: action.domains,
            article: action.domains[0]
        };
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
            article: []
        };
    case ARTICLE.DOMAIN_CHANGE:
        if (state.available.indexOf(action.domain) === -1) {
            return state;
        }
        return {
            ...state,
            article: action.domain
        };
    case PUBLICATION.DOMAIN_CHANGE:
        if (state.all.indexOf(action.domain) === -1) {
            return state;
        }
        return {
            ...state,
            publication: action.domain
        };
    case A2Z.DOMAIN_CHANGE:
        if (state.all.indexOf(action.domain) === -1) {
            return state;
        }
        return {
            ...state,
            a2z: action.domain
        };
    default:
        return state;
    }
}
