import actions, {
    NAVIGATE,
    LOGIN,
    API_LOGIN_SUCCESS
} from '../actions';

export default store => next => action => authentication(store, next, action);

export const authentication = (store, next, action) => {
    const state = store.getState();

    if(state.login.token) {
        return next(action);
    }

    switch (action.type) {
    case NAVIGATE:
        switch (action.location) {
        case 'article':
            next(actions.pauseAction(action));
            return next(actions.showLogin());
        default:
            return next(action);
        }
        return;
    case LOGIN:
    case API_LOGIN_SUCCESS:
        next(action);
        return next(state.pausedAction);
    default:
        return next(action);
    }
};
