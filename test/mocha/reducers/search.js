import { Map } from 'immutable';
import getSearch from '../../../lib/reducers/search';
import { SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_ERROR, TERM_CHANGE, DOMAIN_CHANGE } from '../../../lib/actions';

describe('reducers search', function () {
    let search;
    before(function () {
        search = getSearch();
    });

    it('should return PENDING if action is SEARCH_PENDING', function () {
        const searchState = search(
            Map({ term: 'my search', status: 'NONE' }),
            { type: SEARCH_PENDING }
        ).toJS();
        assert.deepEqual(searchState, { term: 'my search', status: 'PENDING' });
    });

    it('should return SUCCESS if action is SEARCH_SUCCESS', function () {
        const searchState = search(
            Map({ status: 'NONE', term: 'aids' }),
            { type: SEARCH_SUCCESS }
        ).toJS();
        assert.deepEqual(searchState, {
            status: 'SUCCESS',
            term: 'aids',
            searchedTerm: 'aids'
        });
    });

    it('should return ERROR and error message if action is SEARCH_ERROR', function () {
        const searchState = search(
            Map({ status: 'NONE' }),
            { type: SEARCH_ERROR, error: { message: 'boom' } }
        ).toJS();
        assert.deepEqual(searchState, {
            status: 'ERROR',
            error: 'boom'
        });
    });

    it('should update term with action.term if action is TERM_CHANGE', function () {
        const searchState = search(
            Map({ status: 'state' }),
            { type: TERM_CHANGE, term: 'searched term' }
        ).toJS();
        assert.deepEqual(searchState, { status: 'state', term: 'searched term' });
    });

    it('should update domain with action.domain if action is DOMAIN_CHANGE', function () {
        const searchState = search(
            Map({ status: 'state' }),
            { type: DOMAIN_CHANGE, domain: 'test' }
        ).toJS();
        assert.deepEqual(searchState, { status: 'state', currentDomain: 'test' });
    });

    it('should return passed state if action is none of the above', function () {
        const searchState = search(
            Map({ status: 'state' }),
            { type: 'OTHER_ACTION_TYPE' }
        );
        assert.deepEqual(searchState, Map({ status: 'state' }));
    });

    it('should default status to NONE and term to "" if none given', function () {
        const searchState = search(undefined, { type: 'OTHER_ACTION_TYPE' });
        assert.deepEqual(searchState, Map({ term: '', status: 'NONE', currentDomain: '' }));
    });

    it('default term and domain to passed term and domain', function () {
        search = getSearch('geronimo', 'test');
        assert.deepEqual(search(undefined, { type: 'OTHER_ACTION_TYPE' }).toJS(), { term: 'geronimo', currentDomain: 'test', status: 'NONE' });
    });
});
