import {
    RETRIEVE_SUCCESS,
    RETRIEVE_LINK_SUCCESS
} from '../actions';

export default function record(state = {}, action) {
    switch (action.type) {
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
