import {
    RESET,
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
        return state.available.indexOf(state.defaultDomain) !== -1 ? state.defaultDomain : undefined;
    }
    return state.all.indexOf(state.defaultDomain) !== -1 ? state.defaultDomain : undefined;
};

export const getDomainValue = (state, location) => {
    if(location === 'article') {
        return state.available.indexOf(state.defaultDomain) !== -1 ? state.defaultDomain : state.available[0];
    }

    return state.all.indexOf(state.defaultDomain) !== -1 ? state.defaultDomain : state.all[0];
};


// undefined is no change
export const getDomainChange = (state) => {
    const defaultArticleDomain = getDefaultDomain(state, 'article');
    const defaultPublicationDomain = getDefaultDomain(state, 'publication');
    const defaultA2zDomain = getDefaultDomain(state, 'a2z');

    return {
        article: state.article !== defaultArticleDomain ? defaultArticleDomain : undefined,
        publication: state.publication !== defaultPublicationDomain ? defaultPublicationDomain : undefined,
        a2z: state.a2z !== defaultA2zDomain ? defaultA2zDomain : undefined
    };
};

export default function domains(state = defaultState, action) {
    switch (action.type) {
    case RESET:
        return {
            ...defaultState,
            defaultDomain: state.defaultDomain
        };
    case SET_ALL_DOMAINS: {
        const intermediaryState = {
            ...state,
            all: action.domains
        };

        return {
            ...intermediaryState,
            publication: getDomainValue(intermediaryState, 'publication'),
            a2z: getDomainValue(intermediaryState, 'a2z')
        };
    }
    case LOGIN_SUCCESS: {
        const intermediaryState = {
            ...state,
            available: action.response.domains
        };
        return {
            ...intermediaryState,
            article: getDomainValue(intermediaryState, 'article')
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
