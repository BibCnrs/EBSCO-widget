import { put, select, call } from 'redux-saga/effects';

import fetch from '../../../lib/sagas/fetch';
import { exportNotice, openExport } from '../../../lib/sagas/exportNotice';
import * as fromState from '../../../lib/selectors';
import actions, {
    SEARCH,
    LOGOUT
} from '../../../lib/actions';

describe('sagas export notice', function () {
    let iterator;
    let action = { category: 'category', format: 'ris', ids: [1, 2, 3] };
    beforeEach(function () {
        iterator = exportNotice(action);
    });

    it('should select canUserRetrieve', function () {
        const next = iterator.next();
        assert.deepEqual(next.value, select(fromState.canUserRetrieve));
    });

    it('should trigger EXPORT_NOTICE_PENDING action if user canRetrieve', function () {
        iterator.next();
        const next = iterator.next(true);
        assert.deepEqual(next.value, put(actions.exportNoticePending(action.ids)));
    });

    it('should select isUserLogged if user cannot retrieve', function () {
        iterator.next();
        const next = iterator.next(false);
        assert.deepEqual(next.value, select(fromState.isUserLogged));
    });

    it('should trigger pauseAction with current action, trigger showLogin action and end if user is not logged', function () {
        iterator.next();
        iterator.next(false);
        let next = iterator.next(false);
        assert.deepEqual(next.value, put(actions.pauseAction(action)));
        next = iterator.next();
        assert.deepEqual(next.value, put(actions.showLogin()));
        next = iterator.next();
        assert.isTrue(next.done);
    });

    it('should select SelectedRecordsExportRequest', function () {
        iterator.next();
        iterator.next(true);
        const next = iterator.next();
        assert.deepEqual(next.value, select(fromState.getExportRequestForIds, { format: 'ris', ids: action.ids }));
    });

    it('should fetch ris Notice using the retrieved link', function () {
        iterator.next();
        iterator.next(true);
        iterator.next();
        const next = iterator.next({ retrieveLink: 'request' });
        assert.deepEqual(next.value, call(fetch, { retrieveLink: 'request' }, [SEARCH, LOGOUT], false));
    });

    it('should call openExport with returned response', function () {
        const notices = ['ris1', 'ris2', 'ris3'];
        iterator.next();
        iterator.next(true);
        iterator.next();
        iterator.next({ retrieveLink: 'request' });
        const next = iterator.next({ response: notices });
        assert.deepEqual(next.value, call(openExport, notices.join('')));
    });

    it('should cancel openExport if receiving cancel key', function () {
        const notices = ['ris1', 'ris2', 'ris3'];
        iterator.next();
        iterator.next(true);
        iterator.next();
        iterator.next({ retrieveLink: 'request' });
        const next = iterator.next({ cancel: true, response: notices });
        assert.isTrue(next.done);
    });

    it('should trigger EXPORT_NOTICE_ERROR if receiving error key', function () {
        const notices = ['ris1', 'ris2', 'ris3'];
        iterator.next();
        iterator.next(true);
        iterator.next();
        iterator.next({ retrieveLink: 'request' });
        const next = iterator.next({ error: 'error', response: notices });
        assert.deepEqual(next.value, put(actions.exportNoticeError('error')));
    });
});
