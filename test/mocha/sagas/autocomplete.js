import { put, call } from 'redux-saga/effects';

import { autoComplete, parseAutoComplete } from '../../../lib/sagas/autoComplete';
import fetch from '../../../lib/sagas/fetch';
import actions, {
    CHANGE_TERM,
    SEARCH
} from '../../../lib/actions';
import { delay } from '../../../lib/services/sagaUtils';

describe('sagas autoComplete', function () {
    let iterator;
    let action = {
        category: 'article',
        term: 'aids epidemic',
        index: 7
    };
    beforeEach(function () {
        iterator = autoComplete(action);
    });

    it('should call delay with 100 then call fetch', function () {
        let next = iterator.next();
        assert.deepEqual(next.value, call(delay, 100));
        next = iterator.next();
        assert.deepEqual(next.value, call(fetch, {
            url: `https://widgets.ebscohost.com/prod/simplekey/autocomplete/autocomp.php?q=${action.term.replace(/\s/, '%2B')}`
        }, [CHANGE_TERM, SEARCH], false));
    });

    it('should end if fetch return cancel', function () {
        iterator.next();
        iterator.next();
        const next = iterator.next({ cancel: true });

        assert.isTrue(next.done);
    });

    it('should end if fetch return empty response', function () {
        iterator.next();
        iterator.next();
        const next = iterator.next({ response: '' });

        assert.isTrue(next.done);
    });

    it('should call console.error and end if fetch return an error', function () {
        iterator.next();
        iterator.next();
        const next = iterator.next({ error: 'Boom' });

        assert.deepEqual(next.value, call(window.console.error, 'Boom'));
    });

    it('should call parseAutoComplete with fetch reponse', function () {
        iterator.next();
        iterator.next();
        const next = iterator.next({ response: 'autocomplete response' });

        assert.deepEqual(next.value, call(parseAutoComplete, 'autocomplete response'));
    });

    it('should call console.error if parseAutoComplete throw an error', function () {
        iterator.next();
        iterator.next();
        iterator.next({ response: 'autocomplete response' });
        const error = new Error('Boom');
        let next = iterator.throw(error);

        assert.deepEqual(next.value, call(window.console.error, error));
        next = iterator.next();
        assert.isTrue(next.done);
    });

    it('should put actions suggestTerms with parseAutoComplete result', function () {
        iterator.next();
        iterator.next();
        iterator.next({ response: 'autocomplete response' });
        let next = iterator.next('parseAutoComplete result');

        assert.deepEqual(next.value, put(actions.suggestTerms(action.category, 'parseAutoComplete result', action.index)));
        next = iterator.next();
        assert.isTrue(next.done);
    });

});
