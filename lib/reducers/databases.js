import {
    RETRIEVE_DATABASE_SUCCESS,
} from '../actions';

export const defaultState = [];

export default function domains(state = defaultState, action) {
    switch (action.type) {
    case RETRIEVE_DATABASE_SUCCESS:
        return action.response;
    default:
        return state;
    }
}

export const getSortedDatabases = (state, language) => state.reduce((result, database) => ({
    ...result,
    [database[`name_${language}`][0].toLowerCase()]: (result[database[`name_${language}`][0].toLowerCase()] || []).concat(database),
}), {});
