import actions, {
    NAVIGATE,
    LOGIN_SUCCESS,
    API_LOGIN_SUCCESS,
    A2Z,
    PUBLICATION
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
        return;
    case A2Z.SHOW_NOTICE:
        if(state.login.token) {
            if (state.domains.available.indexOf(state.domains.a2z) === -1) {
                return next(actions.forbidAccess(state.domains.a2z));
            }
            return next(action);
        }
        next(actions.pauseAction(action));

        return next(actions.showLogin());
    case PUBLICATION.SHOW_NOTICE:
        if(state.login.token) {
            if (state.domains.available.indexOf(state.domains.publication) === -1) {
                return next(actions.forbidAccess(state.domains.publication));
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
