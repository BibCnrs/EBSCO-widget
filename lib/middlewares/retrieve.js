import actions, { FETCH_NOTICE } from '../actions';

export default store => next => action => retrieve(store, next, action);

export const retrieve = function retrieve(store, next, action) {
    next(action);
    const state = store.getState();
    switch(action.type) {
    case FETCH_NOTICE:
        const searchResult = state.searchResult;

        const { dbId, an } = searchResult[searchResult.currentPage][action.index];

        const url = `${state.url}/retrieve/${state.search.domain}/${dbId}/${an}`;
        store.dispatch(actions.retrieve(
            action.index,
            url,
            state.login.token
        ));
    }
};
