import {
    CHANGE_LIMITER,
    SHOW_LIMITER,
    SHOW_MORE_LIMITER,
    LIMIT_SEARCH,
    RESET_LIMITER,
    LOGOUT
} from '../actions';

const defaultToPublicationDate = `${new Date().getFullYear() + 1}-01`;

export const defaultState = {
    limiterShown: true,
    moreShown: false,
    hasChanged: false,
    fullText: true,
    publicationDate: {
        from: '1000-01',
        to: defaultToPublicationDate
    },
    peerReviewed: false,
    author: null,
    journalName: null,
    title: null,
    language: null
};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case SHOW_LIMITER:
        return {
            ...state,
            limiterShown: action.visibility
        };
    case SHOW_MORE_LIMITER:
        return {
            ...state,
            moreShown: action.visibility
        };
    case CHANGE_LIMITER:
        return {
            ...state,
            [action.limiter]: action.value,
            hasChanged: true
        };
    case LIMIT_SEARCH:
        return {
            ...state,
            hasChanged: false
        };
    case RESET_LIMITER:
        return {
            ...defaultState,
            limiterShown: true,
            moreShown: state.moreShown
        };
    case LOGOUT:
        return defaultState;
    default:
        return state;
    }
}
