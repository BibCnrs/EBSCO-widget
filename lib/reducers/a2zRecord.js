import {
    RETRIEVE_SUCCESS,
    SHOW_NOTICE
} from '../actions/a2z';

export const defaultState = {
    noticeShown: false
};

export default function record(state = defaultState, action) {
    switch (action.type) {
    case RETRIEVE_SUCCESS:
        return {
            ...state,
            notice: action.response
        };
    case SHOW_NOTICE:
        return {
            ...state,
            noticeShown: action.visibility
        };
    default:
        return state;
    }
}
