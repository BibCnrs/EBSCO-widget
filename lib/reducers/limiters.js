import {
    CHANGE_LIMITER,
    RESET,
    LOGOUT
} from '../actions';

const defaultToPublicationDate = `${new Date().getFullYear() + 1}-01`;

export const defaultState = {
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
    case CHANGE_LIMITER:
        return {
            ...state,
            [action.limiter]: action.value
        };
    case RESET:
        return {
            ...defaultState
        };
    case LOGOUT:
        return defaultState;
    default:
        return state;
    }
}
