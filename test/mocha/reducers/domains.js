import {
    FETCH_DOMAINS_SUCCESS,
    FETCH_DOMAINS_ERROR,
    FETCH_DOMAINS_PENDING,
    LOGIN,
    API_LOGIN_SUCCESS,
    LOGOUT,
    ARTICLE,
    PUBLICATION,
    A2Z
} from '../../../lib/actions';
import domains from '../../../lib/reducers/domains';

describe.only('reducer domains', function () {
    it('should set all to action.response, and publication ant a2z to action.response[0] when action is FETCH_DOMAINS_SUCCESS', function () {
        assert.deepEqual(domains({}, {
            type: FETCH_DOMAINS_SUCCESS,
            response: ['INSB', 'INSHS']
        }), {
            all: ['INSB', 'INSHS'],
            a2z: 'INSB',
            publication: 'INSB'
        });
    });

    it('should set all to [], and publication ant a2z to action.response[0] when action is FETCH_DOMAINS_ERROR or FETCH_DOMAINS_PENDING', function () {
        [FETCH_DOMAINS_ERROR, FETCH_DOMAINS_PENDING]
        .forEach(type => {
            assert.deepEqual(domains({
                all: ['INSB', 'INSHS'],
                a2z: 'INSB',
                publication: 'INSB'
            }, {
                type
            }), {
                all: [],
                a2z: null,
                publication: null
            });
        });
    });

    it('should set available to action.domains, and article to action.response.domains[0] when action is LOGIN', function () {
        assert.deepEqual(domains({}, {
            type: LOGIN,
            domains: ['INSB', 'INSHS']
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

    it('should set article to action.domain when action is ARTICLE_DOMAIN_CHANGE', function () {
        assert.deepEqual(domains({
            available: ['INSB', 'INSHS'],
            article: 'INSB'
        }, {
            type: ARTICLE.DOMAIN_CHANGE,
            domain: 'INSHS'
        }), {
            available: ['INSB', 'INSHS'],
            article: 'INSHS'
        });
    });

    it('should not set article to action.domain when action is ARTICLE_DOMAIN_CHANGE but action.domain is not in available', function () {
        assert.deepEqual(domains({
            available: ['INSB', 'INSHS'],
            article: 'INSB'
        }, {
            type: ARTICLE.DOMAIN_CHANGE,
            domain: 'INC'
        }), {
            available: ['INSB', 'INSHS'],
            article: 'INSB'
        });
    });

    it('should set publication to action.domain when action is PUBLICATION_DOMAIN_CHANGE', function () {
        assert.deepEqual(domains({
            all: ['INSB', 'INSHS'],
            publication: 'INSB'
        }, {
            type: PUBLICATION.DOMAIN_CHANGE,
            domain: 'INSHS'
        }), {
            all: ['INSB', 'INSHS'],
            publication: 'INSHS'
        });
    });

    it('should not set article to action.domain when action is PUBLICATION_DOMAIN_CHANGE but action.domain is not in available', function () {
        assert.deepEqual(domains({
            all: ['INSB', 'INSHS'],
            publication: 'INSB'
        }, {
            type: PUBLICATION.DOMAIN_CHANGE,
            domain: 'INC'
        }), {
            all: ['INSB', 'INSHS'],
            publication: 'INSB'
        });
    });

    it('should set publication to action.domain when action is A2Z_DOMAIN_CHANGE', function () {
        assert.deepEqual(domains({
            all: ['INSB', 'INSHS'],
            a2z: 'INSB'
        }, {
            type: A2Z.DOMAIN_CHANGE,
            domain: 'INSHS'
        }), {
            all: ['INSB', 'INSHS'],
            a2z: 'INSHS'
        });
    });

    it('should not set article to action.domain when action is A2Z_DOMAIN_CHANGE but action.domain is not in available', function () {
        assert.deepEqual(domains({
            all: ['INSB', 'INSHS'],
            a2z: 'INSB'
        }, {
            type: A2Z.DOMAIN_CHANGE,
            domain: 'INC'
        }), {
            all: ['INSB', 'INSHS'],
            a2z: 'INSB'
        });
    });
});
