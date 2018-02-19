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

describe('reducer domains', function() {
    describe('actions', function() {
        it('should set all to action.domains, and publication to action.domains[0] when action is SET_ALL_DOMAINS', function() {
            assert.deepEqual(
                domains(
                    {},
                    {
                        type: SET_ALL_DOMAINS,
                        domains: ['INSB', 'INSHS'],
                    },
                ),
                {
                    all: ['INSB', 'INSHS'],
                    publication: 'INSB',
                },
            );
        });

        it('should set all to action.domains, and publication to state.defaultDomain if it is in action.domains when action is SET_ALL_DOMAINS', function() {
            assert.deepEqual(
                domains(
                    {
                        defaultDomain: 'INSHS',
                    },
                    {
                        type: SET_ALL_DOMAINS,
                        domains: ['INSB', 'INSHS'],
                    },
                ),
                {
                    all: ['INSB', 'INSHS'],
                    publication: 'INSHS',
                    defaultDomain: 'INSHS',
                },
            );
        });

        it('should set available to action.domains, and article to action.response.domains[0] when action is LOGIN_SUCCESS', function() {
            assert.deepEqual(
                domains(
                    {
                        all: ['INSB', 'INSHS'],
                        available: ['INSB', 'INSHS'],
                    },
                    {
                        type: LOGIN_SUCCESS,
                        response: {
                            domains: ['INSB', 'INSHS'],
                            favorite_domain: 'INSB',
                        },
                    },
                ),
                {
                    all: ['INSB', 'INSHS'],
                    available: ['INSB', 'INSHS'],
                    database: 'INSB',
                    favoriteDomain: 'INSB',
                },
            );
        });

        it('should set available to action.domains if it is present in action.domains when action is LOGIN_SUCCESS', function() {
            assert.deepEqual(
                domains(
                    { defaultDomain: 'INSHS', all: ['INSB', 'INSHS'] },
                    {
                        type: LOGIN_SUCCESS,
                        response: {
                            domains: ['INSB', 'INSHS'],
                            favorite_domain: 'INSHS',
                        },
                    },
                ),
                {
                    defaultDomain: 'INSHS',
                    all: ['INSB', 'INSHS'],
                    available: ['INSB', 'INSHS'],
                    database: 'INSHS',
                    favoriteDomain: 'INSHS',
                },
            );
        });

        it('should set available to [], and article to null when action is LOGOUT', function() {
            assert.deepEqual(
                domains(
                    {
                        available: ['INSB', 'INSHS'],
                        article: 'INSB',
                    },
                    {
                        type: LOGOUT,
                    },
                ),
                {
                    available: [],
                    article: null,
                    favoriteDomain: null,
                },
            );
        });

        it('should set article to action.domain when action is DOMAIN_CHANGE and category publication', function() {
            assert.deepEqual(
                domains(
                    {
                        available: ['INSB', 'INSHS'],
                        article: 'INSB',
                    },
                    {
                        type: DOMAIN_CHANGE,
                        category: 'article',
                        domain: 'INSHS',
                    },
                ),
                {
                    available: ['INSB', 'INSHS'],
                    article: 'INSHS',
                },
            );
        });

        it('should not set article to action.domain when action is DOMAIN_CHANGE and category article but action.domain is not in available', function() {
            assert.deepEqual(
                domains(
                    {
                        available: ['INSB', 'INSHS'],
                        article: 'INSB',
                    },
                    {
                        type: DOMAIN_CHANGE,
                        category: 'article',
                        domain: 'INC',
                    },
                ),
                {
                    available: ['INSB', 'INSHS'],
                    article: 'INSB',
                },
            );
        });

        it('should set publication to action.domain when action is DOMAIN_CHANGE and category publication even if not available', function() {
            assert.deepEqual(
                domains(
                    {
                        available: ['INSB'],
                        publication: 'INSB',
                    },
                    {
                        type: DOMAIN_CHANGE,
                        category: 'publication',
                        domain: 'INSHS',
                    },
                ),
                {
                    available: ['INSB'],
                    publication: 'INSHS',
                },
            );
        });

        it('should set article to action.query.domain if action is RESTORE_HISTORY', function() {
            assert.deepEqual(
                domains(
                    {
                        available: ['INSB'],
                        article: 'INSB',
                    },
                    {
                        type: RESTORE_HISTORY,
                        category: 'article',
                        query: { domain: 'INSHS' },
                    },
                ),
                {
                    available: ['INSB'],
                    article: 'INSHS',
                },
            );
        });

        it('should set article to action.query.domain if action is RELOAD_HISTORY', function() {
            assert.deepEqual(
                domains(
                    {
                        available: ['INSB'],
                        article: 'INSB',
                    },
                    {
                        type: RELOAD_HISTORY,
                        category: 'article',
                        query: { domain: 'INSHS' },
                    },
                ),
                {
                    available: ['INSB'],
                    article: 'INSHS',
                },
            );
        });

        it('should return state unchanged if action is INITIALIZE, location is article and specified domain is not available', function() {
            assert.deepEqual(
                domains(
                    {
                        available: ['INSB'],
                        all: ['INSB'],
                        article: 'INSB',
                    },
                    {
                        type: INITIALIZE,
                        location: 'article',
                        domain: 'foo',
                        domainFromUrl: 'foo',
                    },
                ),
                {
                    available: ['INSB'],
                    all: ['INSB'],
                    article: 'INSB',
                    setFromUrl: 'foo',
                },
            );
        });

        it('should return state unchanged if action is INITIALIZE, location is not article and specified domain does not exist', function() {
            assert.deepEqual(
                domains(
                    {
                        all: ['INSB'],
                        article: 'INSB',
                    },
                    {
                        type: INITIALIZE,
                        location: 'publication',
                        domain: 'foo',
                        domainFromUrl: 'foo',
                    },
                ),
                {
                    all: ['INSB'],
                    article: 'INSB',
                    setFromUrl: 'foo',
                },
            );
        });

        it('should set state.domain, state.domainFromUrl and state.article if the action is INITIALIZE, location is article and specified domain is available', function() {
            assert.deepEqual(
                domains(
                    {
                        all: ['INSB', 'FOO'],
                        article: 'INSB',
                        available: ['INSB', 'FOO'],
                    },
                    {
                        domain: 'FOO',
                        domainFromUrl: 'FOO',
                        location: 'article',
                        type: INITIALIZE,
                    },
                ),
                {
                    all: ['INSB', 'FOO'],
                    article: 'FOO',
                    available: ['INSB', 'FOO'],
                    defaultDomain: 'FOO',
                    setFromUrl: 'FOO',
                },
            );
        });

        it('should set state.domain, state.domainFromUrl and state.publication if the action is INITIALIZE, location is publication and specified domain is available', function() {
            assert.deepEqual(
                domains(
                    {
                        all: ['INSB', 'FOO'],
                        available: ['INSB'],
                        publication: 'INSB',
                    },
                    {
                        domain: 'FOO',
                        domainFromUrl: 'FOO',
                        location: 'publication',
                        type: INITIALIZE,
                    },
                ),
                {
                    all: ['INSB', 'FOO'],
                    available: ['INSB'],
                    defaultDomain: 'FOO',
                    publication: 'FOO',
                    setFromUrl: 'FOO',
                },
            );
        });
    });

    describe('fromState', function() {
        describe('getDefaultDomain', function() {
            it('should return undefined if defaultDomain is not available when called with available = true', function() {
                assert.equal(
                    fromState.getDefaultDomain(
                        {
                            available: [],
                            defaultDomain: 'default',
                        },
                        true,
                    ),
                    undefined,
                );
            });

            it('should return undefined if defaultDomain is not in all when called with available = false', function() {
                assert.equal(
                    fromState.getDefaultDomain(
                        {
                            all: [],
                            available: [],
                            defaultDomain: 'default',
                        },
                        false,
                    ),
                    undefined,
                );
            });

            it('should return defaultDomain if available when called with available = true', function() {
                assert.equal(
                    fromState.getDefaultDomain(
                        {
                            available: ['default'],
                            defaultDomain: 'default',
                        },
                        true,
                    ),
                    'default',
                );
            });

            it('should return defaultDomain if in all when called with available = false', function() {
                assert.equal(
                    fromState.getDefaultDomain(
                        {
                            all: ['default'],
                            defaultDomain: 'default',
                        },
                        false,
                    ),
                    'default',
                );
            });

            it('should return defaultDomain if favoriteDomain is not available when called with available = true and there is a favoriteDomain', function() {
                assert.equal(
                    fromState.getDefaultDomain(
                        {
                            available: ['default'],
                            defaultDomain: 'default',
                            favoriteDomain: 'favorite',
                        },
                        true,
                    ),
                    'default',
                );
            });

            it('should return favoriteDomain if available when called with available = true and there is a favoriteDomain', function() {
                assert.equal(
                    fromState.getDefaultDomain(
                        {
                            available: ['default', 'favorite'],
                            defaultDomain: 'default',
                            favoriteDomain: 'favorite',
                        },
                        true,
                    ),
                    'favorite',
                );
            });

            it('should return setFromUrl domain if available when called with available = true and there is setFromUrl', function() {
                assert.equal(
                    fromState.getDefaultDomain(
                        {
                            available: ['default', 'favorite', 'url'],
                            defaultDomain: 'default',
                            favoriteDomain: 'favorite',
                            setFromUrl: 'url',
                        },
                        true,
                    ),
                    'url',
                );
            });

            it('should return favoriteDomain domain if setFromUrl domain is not available when called with available = true and there is setFromUrl', function() {
                assert.equal(
                    fromState.getDefaultDomain(
                        {
                            available: ['default', 'favorite'],
                            defaultDomain: 'default',
                            favoriteDomain: 'favorite',
                            setFromUrl: 'url',
                        },
                        true,
                    ),
                    'favorite',
                );
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
                    available: ['INSHS', 'INSB'],
                };

                assert.deepEqual(fromState.getDomainChange(state), {
                    article: 'INSHS',
                    publication: 'INSHS',
                    database: 'INSHS',
                });
            });

            it('should return undefined when defaultDomain is equal to category domain', function() {
                const state = {
                    article: 'INSB',
                    publication: 'INSHS',
                    database: 'INSU',
                    defaultDomain: 'INSHS',
                    all: ['INSHS', 'INSB'],
                    available: ['INSHS', 'INSB'],
                };

                assert.deepEqual(fromState.getDomainChange(state), {
                    article: 'INSHS',
                    publication: undefined,
                    database: 'INSHS',
                });
            });

            it('should return undefined when defaultDomain is equal to category domain for article', function() {
                const state = {
                    article: 'INSHS',
                    publication: 'INSB',
                    database: 'INSU',
                    defaultDomain: 'INSHS',
                    all: ['INSHS', 'INSB'],
                    available: ['IN2P3', 'INSHS', 'INSB'],
                };

                assert.deepEqual(fromState.getDomainChange(state), {
                    article: undefined,
                    publication: 'INSHS',
                    database: 'INSHS',
                });
            });

            it('should return available[0] when no defaultDomain', function() {
                const state = {
                    article: 'INSHS',
                    publication: 'INSB',
                    database: 'INSU',
                    defaultDomain: undefined,
                    all: ['INSHS', 'INSB'],
                    available: ['IN2P3', 'INSHS', 'INSB'],
                };

                assert.deepEqual(fromState.getDomainChange(state), {
                    article: 'IN2P3',
                    publication: 'IN2P3',
                    database: 'IN2P3',
                });
            });
        });
    });
});
