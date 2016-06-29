import fetch from 'isomorphic-fetch';

import * as fromNotice from '../reducers/notice';
import * as fromSearchResult from '../reducers/searchResult';

export const EXPORT_NOTICE = 'EXPORT_NOTICE';
export const EXPORT_NOTICE_PENDING = 'EXPORT_NOTICE_PENDING';
export const EXPORT_NOTICE_SUCCESS = 'EXPORT_NOTICE_SUCCESS';
export const EXPORT_NOTICE_ERROR = 'EXPORT_NOTICE_ERROR';
export const BATCH_RETRIEVE_SUCCESS = 'BATCH_RETRIEVE_SUCCESS';

const exportNotice = (category, ids) => (dispatch, getState) => {

    dispatch({
        type: EXPORT_NOTICE_PENDING,
        category
    });
    const { url, domains, login, notice, searchResult } = getState();
    const missingIds = fromNotice.getMissingNoticeIds(notice, category, ids);
    if(!missingIds.length) {
        const notices = fromNotice.getNoticesByIds();
        dispatch({
            type: EXPORT_NOTICE_SUCCESS,
            category,
            notices
        });
    }
    const publicationIds = fromSearchResult.getRecordPublicationIdByIds(searchResult, category, missingIds);

    fetch(`${url}/${domains[category]}/publication/batchRetrieve?${publicationIds.map(id => `ids=${id}`)}`, {
        credentials: 'include',
        headers: {
            Authorization: `Bearer ${login.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.text()
            .then((text) => text)
            .then((text) => JSON.parse(text));
        }
        var error = new Error(response.statusText);
        error.response = response;
        error.code = response.status;
        throw error;
    })
    .then(json => {
        dispatch({
            type: BATCH_RETRIEVE_SUCCESS,
            category,
            response: json
        });
        const notices = fromNotice.getNoticesByIds(notice, category, ids);

        return dispatch({
            type: EXPORT_NOTICE_SUCCESS,
            category,
            notices
        });
    }, error => {
        window.console.log(error.stack);
        if (error.stack.match('Failed to fetch')) {
            error.code = 'failedFetch';
        }
        return dispatch({
            type: 'ERROR',
            error
        });
    });
};

export default exportNotice;
