import { combineReducers } from 'redux';
import createNotice, * as fromNotice from './createNotice';

export default combineReducers({
    article: createNotice('article'),
    publication: createNotice('publication'),
    a2z: createNotice('a2z')
});

const mount = (selector) => (state, category, ...args) => selector(state[category], ...args);

export const isNoticeShown = mount(fromNotice.isNoticeShown);
export const getNoticeById = mount(fromNotice.getNoticeById);
export const getNoticesByIds = mount(fromNotice.getNoticesByIds);
export const getMissingNoticeIds = mount(fromNotice.getMissingNoticeIds);
export const getAU = mount(fromNotice.getAU);
