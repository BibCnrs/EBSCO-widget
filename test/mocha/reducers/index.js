import * as fromState from '../../../lib/reducers';

describe('index reducers', function () {
    describe('selector', function () {
        describe('selectRetrieveUrl', function () {
            it('should generate retrieve url for article when loation is article', function () {
                assert.equal(fromState.getRetrieveUrl({
                    url: 'http://api',
                    domains: {
                        article: 'insb'
                    },
                    userInterface: {
                        location: 'article'
                    }
                }, 'dbId', 'an'), 'http://api/insb/article/retrieve/dbId/an');
            });

            it('should generate retrieve url for publication when location is publication', function () {
                assert.equal(fromState.getRetrieveUrl({
                    url: 'http://api',
                    domains: {
                        publication: 'insb'
                    },
                    userInterface: {
                        location: 'publication'
                    }
                }, 'publicationId'), 'http://api/insb/publication/retrieve/publicationId');
            });

            it('should generate retrieve url for a2z when location is a2z', function () {
                assert.equal(fromState.getRetrieveUrl({
                    url: 'http://api',
                    domains: {
                        a2z: 'insb'
                    },
                    userInterface: {
                        location: 'a2z'
                    }
                }, 'publicationId'), 'http://api/insb/publication/retrieve/publicationId');
            });
        });
    });
});
