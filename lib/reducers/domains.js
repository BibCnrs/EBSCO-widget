import {
    FETCH_DOMAINS_SUCCESS,
    FETCH_DOMAINS_ERROR,
    FETCH_DOMAINS_PENDING,
    DOMAIN_CHANGE,
    LOGIN_SUCCESS,
    API_LOGIN_SUCCESS,
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
            all: [],
            publication: null,
            a2z: null
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
        if (state.available.indexOf(action.domain) === -1) {
            return state;
        }
        return {
            ...state,
            [action.category]: action.domain
        };
    default:
        return state;
    }
}
