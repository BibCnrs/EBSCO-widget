import { combineReducers } from 'redux';
import createNotice, * as fromNotice from './createNotice';

export default combineReducers({
    article: createNotice('article'),
    publication: createNotice('publication'),
    a2z: createNotice('a2z')
});

export const isNoticeShown = (state, category, id) => {
    return fromNotice.isNoticeShown(state[category], id);
};

export const getNoticeById = (state, category, id) => {
    return fromNotice.getNoticeById(state[category], id);
};

export const getNoticesByIds = (state, category, ids) => {
    return fromNotice.getNoticesByIds(state[category], ids);
};

export const getMissingNoticeIds = (state, category, ids) => {
    return fromNotice.getMissingNoticeIds(state[category], ids);
};
