import { fromJS, Map } from 'immutable';
import {
    SEARCH_SUCCESS,
    SEARCH_TERM,
    LOGOUT,
    PAGE_CHANGE,
    PAGE_LOAD
} from '../actions';

import recordList from './recordList';

export default function searchResult(state = Map({ maxPage: 0 }), action) {
    state = fromJS(state);
    switch (action.type) {
    case SEARCH_SUCCESS:
        const currentPage = action.response.currentPage;
        return state
        .set('currentPage', currentPage)
        .set('targetPage', currentPage)
        .set(
            currentPage,
            recordList(action.response.results, action)
        )
        .set('maxPage', action.response.maxPage)
        .set('totalHits', action.response.totalHits);
    case SEARCH_TERM:
    case LOGOUT:
        return Map({ maxPage: 0 });
    case PAGE_CHANGE:
        return state.set('targetPage', action.page);
    case PAGE_LOAD:
        return state.set('currentPage', action.page)
        .set('targetPage', action.page);
    default:
        const page = state.get('currentPage');
        return state.set(page, recordList(state.get(page), action));
    }
}
