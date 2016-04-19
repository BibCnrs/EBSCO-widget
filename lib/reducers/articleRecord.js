import {
    SHOW_NOTICE,
    RETRIEVE_SUCCESS,
    RETRIEVE_LINK_SUCCESS
} from '../actions/article';

export  const  defaultState = {
    noticeShown: false
};

export default function record(state = defaultState, action) {
    switch (action.type) {
    case SHOW_NOTICE:
        return {
            ...state,
            noticeShown: action.visibility
        };
    case RETRIEVE_SUCCESS:
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
