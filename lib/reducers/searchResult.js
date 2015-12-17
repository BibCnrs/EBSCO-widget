import { fromJS, Map } from 'immutable';
import {
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    SEARCH_PENDING,
    LOGOUT,
    PAGE_CHANGE
} from '../actions';

import recordList from './recordList';

export default function searchResult(state = Map({ maxPage: 0 }), action) {
    state = fromJS(state);
    switch (action.type) {
    case SEARCH_SUCCESS:
        const currentPage = action.response.currentPage;
        return state
        .set('currentPage', currentPage)
        .set(
            currentPage,
            recordList(action.response.results, action)
        )
        .set('maxPage', action.response.maxPage);
    case SEARCH_PENDING:
    case SEARCH_ERROR:
    case LOGOUT:
        return Map({ maxPage: 0 });
    case PAGE_CHANGE:
        return state.set('currentPage', action.page);
    default:
        const page = state.get('currentPage');
        return state.set(page, recordList(state.get(page), action));
    }
}
