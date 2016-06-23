const createSelectedRecord = (category) => (state = [], action) => {
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

export default createSelectedRecord;

export const isRecordSelected = (state, id) => {
    if(!Array.isArray(state)) {
        return false;
    }

    return state.indexOf(id) !== -1;
};

export const getSelectedRecord = (state) => {
    return state;
};
