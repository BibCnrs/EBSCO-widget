import {
    INITIALIZE,
    SET_ALL_DOMAINS,
    DOMAIN_CHANGE,
    LOGIN_SUCCESS,
    RESTORE_HISTORY,
    RELOAD_HISTORY,
    LOGOUT,
} from '../../../lib/actions';
import domains, * as fromState from '../../../lib/reducers/domains';

describe('reducer domains', function () {
    describe('actions', function () {

        it('should set all to action.domains, and publication to action.domains[0] when action is SET_ALL_DOMAINS', function () {
            assert.deepEqual(domains({}, {
                type: SET_ALL_DOMAINS,
                domains: ['INSB', 'INSHS']
            }), {
                all: ['INSB', 'INSHS'],
                publication: 'INSB'
            });
        });

        it('should set all to action.domains, and publication to state.defaultDomain if it is in action.domains when action is SET_ALL_DOMAINS', function () {
            assert.deepEqual(domains({
                defaultDomain: 'INSHS'
            }, {
                type: SET_ALL_DOMAINS,
                domains: ['INSB', 'INSHS']
            }), {
                all: ['INSB', 'INSHS'],
                publication: 'INSHS',
                defaultDomain: 'INSHS'
            });
        });

        it('should set available to action.domains, and article to action.response.domains[0] when action is LOGIN_SUCCESS', function () {
            assert.deepEqual(domains({
                all: ['INSB', 'INSHS'],
                available: ['INSB', 'INSHS'],
            }, {
                type: LOGIN_SUCCESS,
                response: { domains: ['INSB', 'INSHS'], favorite_domain: 'INSB' }
            }), {
                all: ['INSB', 'INSHS'],
                available: ['INSB', 'INSHS'],
                database: 'INSB',
                favoriteDomain: 'INSB',
            });
        });

        it('should set available to action.domains if it is present in action.domains when action is LOGIN_SUCCESS', function () {
            assert.deepEqual(domains({ defaultDomain: 'INSHS', all: ['INSB', 'INSHS'] }, {
                type: LOGIN_SUCCESS,
                response: { domains: ['INSB', 'INSHS'], favorite_domain: 'INSHS' }
            }), {
                defaultDomain: 'INSHS',
                all: ['INSB', 'INSHS'],
                available: ['INSB', 'INSHS'],
                database: 'INSHS',
                favoriteDomain: 'INSHS'
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
                article: null,
                favoriteDomain: null,
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

        it('should return state unchanged if action is INITIALIZE, location is article and specified domain is not available', function () {
            assert.deepEqual(domains({
                available: ['INSB'],
                all: ['INSB'],
                article: 'INSB'
            }, {
                type: INITIALIZE,
                location: 'article',
                domain: 'foo',
                domainFromUrl: 'foo',
            }), {
                available: ['INSB'],
                all: ['INSB'],
                article: 'INSB',
                setFromUrl: 'foo',
            });
        });

        it('should return state unchanged if action is INITIALIZE, location is not article and specified domain does not exist', function () {
            assert.deepEqual(domains({
                all: ['INSB'],
                article: 'INSB'
            }, {
                type: INITIALIZE,
                location: 'publication',
                domain: 'foo',
                domainFromUrl: 'foo',
            }), {
                all: ['INSB'],
                article: 'INSB',
                setFromUrl: 'foo',
            });
        });

        it('should set state.domain, state.domainFromUrl and state.article if the action is INITIALIZE, location is article and specified domain is available', function () {
            assert.deepEqual(domains({
                all: ['INSB', 'FOO'],
                article: 'INSB',
                available: ['INSB', 'FOO'],
            }, {
                domain: 'FOO',
                domainFromUrl: 'FOO',
                location: 'article',
                type: INITIALIZE,
            }), {
                all: ['INSB', 'FOO'],
                article: 'FOO',
                available: ['INSB', 'FOO'],
                defaultDomain: 'FOO',
                setFromUrl: 'FOO',
            });
        });

        it('should set state.domain, state.domainFromUrl and state.publication if the action is INITIALIZE, location is publication and specified domain is available', function () {
            assert.deepEqual(domains({
                all: ['INSB', 'FOO'],
                available: ['INSB'],
                publication: 'INSB',
            }, {
                domain: 'FOO',
                domainFromUrl: 'FOO',
                location: 'publication',
                type: INITIALIZE,
            }), {
                all: ['INSB', 'FOO'],
                available: ['INSB'],
                defaultDomain: 'FOO',
                publication: 'FOO',
                setFromUrl: 'FOO',
            });
        });
    });

    describe('fromState', function() {
        describe('getDefaultDomain', function () {

            it('should return defaultDomain for article', function() {
                assert.equal(fromState.getDefaultDomain({
                    article: 'INSB',
                    available: ['INSHS'],
                    defaultDomain: 'INSHS'
                }, 'article'), 'INSHS');
            });

            it('should return undefined if defaultDomains is not in available for article', function() {
                assert.equal(fromState.getDefaultDomain({
                    article: 'INSB',
                    available: [],
                    defaultDomain: 'INSHS'
                }, 'article'), undefined);
            });

            it('should return defaultDomain for publication', function() {
                assert.equal(fromState.getDefaultDomain({
                    article: 'INSB',
                    all: ['INSHS'],
                    defaultDomain: 'INSHS'
                }, 'publication'), 'INSHS');
            });

            it('should return undefined if defaultDomains is not in all for publication', function() {
                assert.equal(fromState.getDefaultDomain({
                    article: 'INSB',
                    all: [],
                    defaultDomain: 'INSHS'
                }, 'publication'), undefined);
            });

        });

        describe('getDomainChange', function() {

            it('should return defaultDomain for all category', function() {
                const state = {
                    article: 'INSB',
                    publication: 'INSB',
                    database: 'INSB',
                    defaultDomain: 'INSHS',
                    all: ['INSHS', 'INSB'],
                    available: ['INSHS', 'INSB']
                };

                assert.deepEqual(fromState.getDomainChange(state), {
                    article: 'INSHS',
                    publication: 'INSHS',
                    database: 'INSHS',
                });
            });

            it('should return undefined when defaultDomain is equal to category domain', function() {
                const state = {
                    article: 'INSHS',
                    publication: 'INSB',
                    database: 'INSU',
                    defaultDomain: 'INSHS',
                    all: ['INSHS', 'INSB'],
                    available: ['INSHS', 'INSB']
                };

                assert.deepEqual(fromState.getDomainChange(state), {
                    article: undefined,
                    publication: 'INSHS',
                    database: 'INSHS',
                });
            });
        });
    });

});
