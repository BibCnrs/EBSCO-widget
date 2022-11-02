import { put } from 'redux-saga/effects';

import { changeAllTerm } from '../../../lib/sagas/changeAllTerm';

import actions, { CHANGE_ALL_TERM } from '../../../lib/actions';

describe('sagas changeAllTerm', function() {
    let iterator;
    const action = {
        category: 'article',
        type: CHANGE_ALL_TERM,
        term: 'covid',
        index: 0,
    };
    beforeEach(function() {
        iterator = changeAllTerm(action);
    });

    it('should put changeTerm for article, publication and metadore', function() {
        let next = iterator.next();
        assert.deepEqual(
            next.value,
            put(actions.changeTerm('article', 'covid', 0)),
        );
        next = iterator.next();
        assert.deepEqual(
            next.value,
            put(actions.changeTerm('publication', 'covid', 0)),
        );
        next = iterator.next();
        assert.deepEqual(
            next.value,
            put(actions.changeTerm('metadore', 'covid', 0)),
        );
        next = iterator.next();
        assert.isTrue(next.done);
    });
});
