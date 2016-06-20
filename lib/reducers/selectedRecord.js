import { combineReducers } from 'redux';

export const createSelectedRecord = (category) => {
    return (state = [], action) => {
        if(action.category !== category) {
            return state;
        }

        switch(action.type) {
        case 'SELECT_RECORD': {
            const index = state.indexOf(action.id);
            return index === -1 ? [
                ...state,
                action.id
            ] : [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];
        }
        default:
            return state;
        }
    };
};

export const isSelected = (state, category, id) => {
    return state[category].indexOf(id) !== -1;
};

export const getSelected = (state, category) => {
    return state[category];
};

export default combineReducers({
    article: createSelectedRecord('article'),
    publication: createSelectedRecord('publication'),
    a2z: createSelectedRecord('a2z')
});
