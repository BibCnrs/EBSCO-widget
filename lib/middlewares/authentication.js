import actions, {
    NAVIGATE,
    LOGIN_SUCCESS,
    API_LOGIN_SUCCESS,
    SHOW_NOTICE
} from '../actions';

export default store => next => action => authentication(store, next, action);

export const authentication = (store, next, action) => {
    const state = store.getState();

    switch (action.type) {
    case NAVIGATE:
        if(state.login.token) {
            return next(action);
        }
        switch (action.location) {
        case 'article':
            next(actions.pauseAction(action));
            return next(actions.showLogin());
        default:
            return next(action);
        }
    case SHOW_NOTICE:
        if(state.login.token) {
            if (state.domains.available.indexOf(state.domains[action.category]) === -1) {
                return next(actions.forbidAccess(state.domains[action.category]));
            }
            return next(action);
        }
        next(actions.pauseAction(action));

        return next(actions.showLogin());
    case LOGIN_SUCCESS:
    case API_LOGIN_SUCCESS:
        if(state.login.token) {
            return next(action);
        }
        next(action);
        return next(state.pausedAction);
    default:
        return next(action);
    }
};
