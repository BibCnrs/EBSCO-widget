import {
    ARTICLE,
    LOGOUT
} from '../actions';

const defaultToPublicationDate = new Date().getFullYear() + 1;

export const defaultState = {
    fullText: true,
    publicationDate: {
        from: null,
        to: null
    },
    peerReviewedArticle: false,
    author: null,
    journalName: null,
    title: null,
    language: []
};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case ARTICLE.CHANGE_LIMITER:
        return {
            ...state,
            [action.limiter]: action.value
        };
    case ARTICLE.RESET:
        return {
            ...defaultState,
            fullText: state.fullText
        };
    case LOGOUT:
        return defaultState;
    default:
        return state;
    }
}
