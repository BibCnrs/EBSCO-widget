import actions, {
    ARTICLE,
    PUBLICATION
} from '../actions';

export default store => next => action => retrieve(store, next, action);

const getUrl = (type, state, record) => {
    switch(type) {
    case 'article':
        return `${state.url}/${state[type].search.domain}/article/retrieve/${record.dbId}/${record.an}`;
    case 'publication':
        return `${state.url}/${state[type].search.domain}/publication/retrieve/${record.publicationId}`;
    }
};

const triggerRetrieve = (type, state, store, index) => {
    const searchResult = state[type].searchResult;
    const record = searchResult[searchResult.currentPage][index];
    if(record.notice) {
        return;
    }

    const url = getUrl(type, state, record);

    return store.dispatch(actions[type].retrieve(
        index,
        url,
        state.login.token
    ));
};

export const retrieve = function retrieve(store, next, action) {
    next(action);
    const state = store.getState();
    switch(action.type) {
    case ARTICLE.SHOW_NOTICE:
        return triggerRetrieve('article', state, store, action.articleIndex);
    case PUBLICATION.SHOW_NOTICE:
        return triggerRetrieve('publication', state, store, action.index);
    }
};
