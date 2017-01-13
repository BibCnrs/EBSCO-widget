import {
    RESET,
    INITIALIZE,
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
    database: 'ALL',
    defaultDomain: null,
    setFromUrl: null,
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
    const defaultDatabaseDomain = getDefaultDomain(state, 'database');

    return {
        article: state.article !== defaultArticleDomain ? defaultArticleDomain : undefined,
        publication: state.publication !== defaultPublicationDomain ? defaultPublicationDomain : undefined,
        database: state.database !== defaultDatabaseDomain ? defaultDatabaseDomain : undefined,
    };
};

export default function domains(state = defaultState, action) {
    switch (action.type) {
    case RESET:
        return {
            ...defaultState,
            defaultDomain: state.defaultDomain
        };
    case INITIALIZE:
        if (action.location && action.domainFromUrl) {
            if(action.location === 'article') {
                if (!state.available.includes(action.domainFromUrl)) {
                    return state;
                }
            }

            if (!state.all.includes(action.domainFromUrl)) {
                return state;
            }

            return {
                ...state,
                defaultDomain: action.domain,
                setFromUrl: action.domainFromUrl,
                [action.location]: action.domainFromUrl,
            };
        }

        return {
            ...state,
            defaultDomain: action.domain,
            setFromUrl: action.domainFromUrl,
        };
    case SET_ALL_DOMAINS: {
        const intermediaryState = {
            ...state,
            all: action.domains
        };

        return {
            ...intermediaryState,
            publication: getDomainValue(intermediaryState, 'publication')
        };
    }
    case LOGIN_SUCCESS: {
        const intermediaryState = {
            ...state,
            available: action.response.domains
        };
        return {
            ...intermediaryState,
            article: getDomainValue(intermediaryState, 'article'),
            database: getDomainValue(intermediaryState, 'database'),
        };
    }
    case LOGOUT:
        return {
            ...state,
            available: [],
            article: null
        };
    case DOMAIN_CHANGE:
        if(!action.category) {
            return {
                ...state,
                article: state.available.includes(action.domain) ? action.domain : state.article,
                publication: action.domain,
                database: action.domain,
            };
        }

        if (action.category === 'article' && !state.available.includes(action.domain)) {
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
