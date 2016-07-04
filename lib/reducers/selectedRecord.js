import { combineReducers } from 'redux';

import createSelectedRecord, * as fromSelectedRecord from './createSelectedRecord';

export default combineReducers({
    article: createSelectedRecord('article'),
    publication: createSelectedRecord('publication'),
    a2z: createSelectedRecord('a2z')
});

export const isRecordSelected = (state, category, id) => {
    return fromSelectedRecord.isRecordSelected(state[category], id);
};

export const getSelectedRecordIds = (state, category) => {
    return fromSelectedRecord.getSelectedRecordIds(state[category]);
};
