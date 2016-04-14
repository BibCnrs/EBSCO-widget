import {
    ARTICLE,
    LOGOUT
} from '../actions';

export const defaultState = {
    fullText: true,
    publicationDate: {
        from: null,
        to: null
    },
    peerReviewedArticle: false
};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case ARTICLE.CHANGE_LIMITER:
        return {
            ...state,
            [action.limiter]: action.value
        };
    case LOGOUT:
        return defaultState;
    default:
        return state;
    }
}
