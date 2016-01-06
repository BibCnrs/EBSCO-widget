import domains from '../../../lib/reducers/domains';
import {
    LOGIN_SUCCESS,
    LOGOUT
} from '../../../lib/actions';

describe('reducers domains', function () {
    let storedDomains = null;

    before(function () {
        window.sessionStorage = {
            getItem: (name) => name === 'domains' ? storedDomains : null
        };
    });

    beforeEach(function () {
        storedDomains = null;
    });

    it('should return domains stored in sessionStorage as default state ', function () {
        storedDomains = '["list", "of", "domains"]';
        assert.deepEqual(domains(undefined, {}), ['list', 'of', 'domains']);

        delete window.sessionStorage;
    });

    it('should return empty list as default state ', function () {
        assert.deepEqual(domains(undefined, {}), []);

        delete window.sessionStorage;
    });

    it('should return action.response.domains when action.type is LOGIN_SUCCESS', function () {
        assert.deepEqual(
            domains('state', {
                type: LOGIN_SUCCESS,
                response: { domains: ['list', 'of', 'domains'] } }
            ),
            ['list', 'of', 'domains']
        );
    });

    it('should return empty list when action.type is LOGOUT', function () {
        assert.deepEqual(domains('state', { type: LOGOUT }), []);
    });

    after(function () {
        delete window.sessionStorage;
    });
});
