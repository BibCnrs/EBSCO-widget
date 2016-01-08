import {
    SEARCH_SUCCESS,
    LOGOUT,
    CHANGE_FACET
} from '../actions';

const defaultState = {};

export default function search(state = defaultState, action) {
    switch (action.type) {
    case SEARCH_SUCCESS:
        return action.response.facets
        .reduce((result, facet) => ({
            ...result,
            [facet.Id]: {
                label: facet.Label,
                choices: facet.AvailableFacetValues,
                value: state[facet.Id] && state[facet.Id].value
            }
        }), {});
    case CHANGE_FACET:
        return {
            ...state,
            [action.id]: {
                ...state[action.id],
                value: action.index
            }
        };
    case LOGOUT:
        return defaultState;
    default:
        return state;
    }
}
