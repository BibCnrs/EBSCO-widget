import {
    LOGOUT,
    SEARCH,
    EXACT_MATCH_SUCCESS,
    EXACT_MATCH_RETRIEVE_SUCCESS,
    SHOW_EXACT_MATCH_NOTICE,
    EXACT_MATCH_SEARCH,
} from '../actions';

export const defaultState = {
    publication: null,
    notice: null,
    noticeShown: false,
};

const exactMatch = (state = defaultState, action) => {
    switch (action.type) {
        case SEARCH:
        case LOGOUT:
        case EXACT_MATCH_SEARCH:
            return defaultState;
        case EXACT_MATCH_SUCCESS:
            return {
                ...state,
                publication: action.response.results[0],
            };
        case SHOW_EXACT_MATCH_NOTICE:
            return {
                ...state,
                noticeShown: !state.noticeShown,
            };
        case EXACT_MATCH_RETRIEVE_SUCCESS:
            return {
                ...state,
                notice: action.response,
            };
        default:
            return state;
    }
};

export default exactMatch;

export const getExactMatchNotice = state => {
    if (!state.notice || !state.notice.items) {
        return null;
    }
    const noticeLiteral = state.notice.items.slice(1).reduce(
        (result, datum) => ({
            ...result,
            [datum.name !== 'URL' ? datum.name : datum.label]: datum.value,
        }),
        {},
    );

    return {
        ...noticeLiteral,
        fullTextHoldings: state.publication
            ? state.publication.fullTextHoldings
            : undefined,
    };
};
export const getExactMatchPublicationId = state =>
    state.publication.publicationId;
