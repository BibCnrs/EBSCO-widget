import {
    RESET,
    INITIALIZE,
    SET_ALL_DOMAINS,
    DOMAIN_CHANGE,
    CHANGE_FAVORITE_DOMAIN,
    LOGIN_SUCCESS,
    RESTORE_HISTORY,
    RELOAD_HISTORY,
    LOGOUT,
} from '../actions';

export const defaultState = {
    all: [],
    available: [],
    rights: [],
    byName: {},
    article: null,
    publication: null,
    database: null,
    defaultDomain: null,
    favoriteDomain: null,
    setFromUrl: null,
};

export const isDomainAvailable = (state, location) =>
    state.available.includes(state[location]);

export const getDefaultDomain = (state, available = true) => {
    const domains = available ? state.available : state.all;
    if (domains.includes(state.setFromUrl)) {
        return state.setFromUrl;
    }
    if (domains.includes(state.favoriteDomain)) {
        return state.favoriteDomain;
    }

    return domains.includes(state.defaultDomain)
        ? state.defaultDomain
        : state.available[0];
};

export const getDomainValue = (state, location) => {
    if (location === 'article') {
        return state.available.includes(state.defaultDomain)
            ? state.defaultDomain
            : state.available[0];
    }

    return state.all.includes(state.defaultDomain)
        ? state.defaultDomain
        : state.all[0];
};

export const getCurrentGate = (state, location) =>
    state.byName[state[location]];

// undefined is no change
export const getDomainChange = state => {
    const defaultAvailableDomain = getDefaultDomain(state, true);
    const defaultDomain = getDefaultDomain(state, false);

    return {
        article:
            state.article !== defaultAvailableDomain
                ? defaultAvailableDomain
                : undefined,
        publication:
            state.publication !== defaultDomain ? defaultDomain : undefined,
        database: state.database !== defaultDomain ? defaultDomain : undefined,
    };
};

export default function domains(state = defaultState, action) {
    switch (action.type) {
        case RESET:
            return {
                ...defaultState,
                defaultDomain: state.defaultDomain,
            };
        case CHANGE_FAVORITE_DOMAIN:
            return {
                ...state,
                article: action.value,
                publication: action.value,
                database: action.value,
                favoriteDomain: action.value,
            };
        case INITIALIZE:
            if (action.location && action.domainFromUrl) {
                if (action.location === 'article') {
                    if (!state.available.includes(action.domainFromUrl)) {
                        return {
                            ...state,
                            setFromUrl: action.domainFromUrl,
                        };
                    }
                }

                if (!state.all.includes(action.domainFromUrl)) {
                    return {
                        ...state,
                        setFromUrl: action.domainFromUrl,
                    };
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
                setFromUrl: null,
            };
        case SET_ALL_DOMAINS: {
            const intermediaryState = {
                ...state,
                all: action.domains.map(({ name }) => name),
                byName: action.domains.reduce(
                    (acc, { name, gate }) => ({
                        ...acc,
                        [name]: gate,
                    }),
                    {},
                ),
            };

            return {
                ...intermediaryState,
                publication: getDomainValue(intermediaryState, 'publication'),
            };
        }
        case LOGIN_SUCCESS: {
            const intermediaryState = {
                ...state,
                available: action.response.domains.filter(
                    name => state.byName[name],
                ),
                rights: action.response.domains,
                favoriteDomain: action.response.favorite_domain,
            };
            return {
                ...intermediaryState,
                database: getDomainValue(intermediaryState, 'database'),
            };
        }
        case LOGOUT:
            return {
                ...state,
                favoriteDomain: null,
                available: [],
                rights: [],
                article: null,
                publication: null,
                database: null,
            };
        case DOMAIN_CHANGE:
            if (!action.category) {
                return {
                    ...state,
                    article: state.available.includes(action.domain)
                        ? action.domain
                        : state.article,
                    publication: action.domain,
                    database: action.domain,
                };
            }

            return [].concat(action.category).reduce((newState, category) => {
                if (
                    action.category === 'article' &&
                    !state.available.includes(action.domain)
                ) {
                    return newState;
                }
                return {
                    ...newState,
                    [category]: action.domain,
                };
            }, state);
        case RESTORE_HISTORY:
        case RELOAD_HISTORY:
            return {
                ...state,
                [action.category]: action.query.domain,
            };
        default:
            return state;
    }
}
