import * as fromState from '../../../lib/reducers';

describe('index reducers', function () {
    describe('selector', function () {
        describe('selectRetrieveUrl', function () {
            it('should generate retrieve url for article', function () {
                assert.equal(fromState.getRetrieveUrl({
                    url: 'http://api',
                    domains: {
                        article: 'insb'
                    }
                }, 'article', 'dbId', 'an'), 'http://api/insb/article/retrieve/dbId/an');
            });

            it('should generate retrieve url for publication', function () {
                assert.equal(fromState.getRetrieveUrl({
                    url: 'http://api',
                    domains: {
                        publication: 'insb'
                    }
                }, 'publication', 'publicationId'), 'http://api/insb/publication/retrieve/publicationId');
            });

            it('should generate retrieve url for a2z', function () {
                assert.equal(fromState.getRetrieveUrl({
                    url: 'http://api',
                    domains: {
                        a2z: 'insb'
                    }
                }, 'a2z', 'publicationId'), 'http://api/insb/publication/retrieve/publicationId');
            });
        });
    });
});
