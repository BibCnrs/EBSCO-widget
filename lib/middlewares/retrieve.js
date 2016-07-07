import actions, {
    SHOW_NOTICE
} from '../actions';

import * as fromState from '../reducers';

export default store => next => action => retrieve(store, next, action);

const getUrl = (type, state, record) => {
    const domain = state.domains[type];
    switch(type) {
    case 'article':
        return `${state.url}/${domain}/article/retrieve/${record.dbId}/${record.an}`;
    case 'a2z':
    case 'publication':
        return `${state.url}/${domain}/publication/retrieve/${record.publicationId}`;
    }
};

const triggerRetrieve = (type, state, store, id) => {
    const record = fromState.getRecordById(state, id);
    const notice = fromState.getNoticeById(state, id);
    if(notice) {
        return;
    }

    const url = getUrl(type, state, record);

    return store.dispatch(actions.retrieve(
        type,
        id,
        url,
        state.login.token
    ));
};

export const retrieve = function retrieve(store, next, action) {
    next(action);
    const state = store.getState();
    switch(action.type) {
    case SHOW_NOTICE:
        return triggerRetrieve(action.category, state, store, action.id);
    }
};
