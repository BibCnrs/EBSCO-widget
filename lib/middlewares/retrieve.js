import actions, {
    ARTICLE
} from '../actions';

export default store => next => action => retrieve(store, next, action);

export const retrieve = function retrieve(store, next, action) {
    next(action);
    const state = store.getState();
    switch(action.type) {
    case ARTICLE.SHOW_NOTICE:
        const searchResult = state.article.searchResult;
        const { dbId, an, notice } = searchResult[searchResult.currentPage][action.index];
        if(notice) {
            return;
        }

        const url = `${state.url}/${state.article.search.domain}/article/retrieve/${dbId}/${an}`;
        store.dispatch(actions.article.retrieve(
            action.index,
            url,
            state.login.token
        ));
    }
};
