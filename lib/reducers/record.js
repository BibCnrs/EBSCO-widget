import notice from './notice';

export default function record(state = {}, action) {
    switch (action.type) {
    default:
        return {
            ...state,
            notice: notice(state.notice, action)
        };
    }
}
