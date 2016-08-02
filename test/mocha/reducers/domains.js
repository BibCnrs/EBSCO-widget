import {
    SET_ALL_DOMAINS,
    DOMAIN_CHANGE,
    LOGIN_SUCCESS,
    API_LOGIN_SUCCESS,
    RESTORE_HISTORY,
    RELOAD_HISTORY,
    LOGOUT
} from '../../../lib/actions';
import domains from '../../../lib/reducers/domains';

describe('reducer domains', function () {
    it('should set all to action.domains, and publication ant a2z to action.domains[0] when action is SET_ALL_DOMAINS', function () {
        assert.deepEqual(domains({}, {
            type: SET_ALL_DOMAINS,
            domains: ['INSB', 'INSHS']
        }), {
            all: ['INSB', 'INSHS'],
            a2z: 'INSB',
            publication: 'INSB'
        });
    });

    it('should set available to action.domains, and article to action.response.domains[0] when action is LOGIN_SUCCESS', function () {
        assert.deepEqual(domains({}, {
            type: LOGIN_SUCCESS,
            response: { domains: ['INSB', 'INSHS'] }
        }), {
            available: ['INSB', 'INSHS'],
            article: 'INSB'
        });
    });

    it('should set available to actionresponse.domains, and article to action.response.domains[0] when action is API_LOGIN_SUCCESS', function () {
        assert.deepEqual(domains({}, {
            type: API_LOGIN_SUCCESS,
            response: {
                domains: ['INSB', 'INSHS']
            }
        }), {
            available: ['INSB', 'INSHS'],
            article: 'INSB'
        });
    });

    it('should set available to [], and article to null when action is LOGOUT', function () {
        assert.deepEqual(domains({
            available: ['INSB', 'INSHS'],
            article: 'INSB'
        }, {
            type: LOGOUT
        }), {
            available: [],
            article: null
        });
    });

    it('should set article to action.domain when action is DOMAIN_CHANGE and category publication', function () {
        assert.deepEqual(domains({
            available: ['INSB', 'INSHS'],
            article: 'INSB'
        }, {
            type: DOMAIN_CHANGE,
            category: 'article',
            domain: 'INSHS'
        }), {
            available: ['INSB', 'INSHS'],
            article: 'INSHS'
        });
    });

    it('should not set article to action.domain when action is DOMAIN_CHANGE and category article but action.domain is not in available', function () {
        assert.deepEqual(domains({
            available: ['INSB', 'INSHS'],
            article: 'INSB'
        }, {
            type: DOMAIN_CHANGE,
            category: 'article',
            domain: 'INC'
        }), {
            available: ['INSB', 'INSHS'],
            article: 'INSB'
        });
    });

    it('should set publication to action.domain when action is DOMAIN_CHANGE and category publication even if not available', function () {
        assert.deepEqual(domains({
            available: ['INSB'],
            publication: 'INSB'
        }, {
            type: DOMAIN_CHANGE,
            category: 'publication',
            domain: 'INSHS'
        }), {
            available: ['INSB'],
            publication: 'INSHS'
        });
    });

    it('should set article to action.query.domain if action is RESTORE_HISTORY', function () {
        assert.deepEqual(domains({
            available: ['INSB'],
            article: 'INSB'
        }, {
            type: RESTORE_HISTORY,
            category: 'article',
            query: { domain: 'INSHS' }
        }), {
            available: ['INSB'],
            article: 'INSHS'
        });
    });

    it('should set article to action.query.domain if action is RELOAD_HISTORY', function () {
        assert.deepEqual(domains({
            available: ['INSB'],
            article: 'INSB'
        }, {
            type: RELOAD_HISTORY,
            category: 'article',
            query: { domain: 'INSHS' }
        }), {
            available: ['INSB'],
            article: 'INSHS'
        });
    });

});
