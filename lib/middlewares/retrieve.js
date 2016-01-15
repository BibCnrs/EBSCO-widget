import actions, { SHOW_NOTICE } from '../actions';

export default store => next => action => retrieve(store, next, action);

export const retrieve = function retrieve(store, next, action) {
    next(action);
    const state = store.getState();
    switch(action.type) {
    case SHOW_NOTICE:
        const searchResult = state.searchResult;
        const { dbId, an, notice } = searchResult[searchResult.currentPage][action.index];
        if(notice) {
            return;
        }

        const url = `${state.url}/retrieve/${state.search.domain}/${dbId}/${an}`;
        store.dispatch(actions.retrieve(
            action.index,
            url,
            state.login.token
        ));
    }
};
