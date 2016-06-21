import {
    RETRIEVE_LINK_SUCCESS
} from '../actions/article';

export  const  defaultState = {};

export default function record(state = defaultState, action) {
    switch (action.type) {
    case RETRIEVE_LINK_SUCCESS:
        return {
            ...state,
            articleLink: action.response.url
        };
    default:
        return state;
    }
}
