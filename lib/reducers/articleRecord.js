import {
    ARTICLE,
    RETRIEVE_LINK_SUCCESS
} from '../actions';

export  const  defaultState = {
    noticeShown: false
};

export default function record(state = defaultState, action) {
    switch (action.type) {
    case ARTICLE.SHOW_NOTICE:
        return {
            ...state,
            noticeShown: action.visibility
        };
    case ARTICLE.RETRIEVE_SUCCESS:
        return {
            ...state,
            notice: action.response
        };
    case RETRIEVE_LINK_SUCCESS:
        return {
            ...state,
            articleLink: action.response.url
        };
    default:
        return state;
    }
}
