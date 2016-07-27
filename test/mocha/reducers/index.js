import * as fromState from '../../../lib/reducers';

describe('index reducers', function () {

    describe.only('selector', function () {

        describe('getPausedAction', function () {
            it('should return pausedAction', function () {
                assert.equal(fromState.getPausedAction({ pausedAction: 'pausedActionValue' }), 'pausedActionValue');
            });
        });

        describe('getCurrentSearchResult', function () {
            it('should return current searchResult result', function () {
                assert.equal(fromState.getCurrentSearchResult({
                    searchResult: {
                        article: 'articleSearchResult'
                    },
                    userInterface: {
                        location: 'article'
                    }
                }), 'articleSearchResult');

                assert.equal(fromState.getCurrentSearchResult({
                    searchResult: {
                        a2z: 'a2zSearchResult'
                    },
                    userInterface: {
                        location: 'a2z'
                    }
                }), 'a2zSearchResult');
                assert.equal(fromState.getCurrentSearchResult({
                    searchResult: {
                        publication: 'publicationSearchResult'
                    },
                    userInterface: {
                        location: 'publication'
                    }
                }), 'publicationSearchResult');
            });
        });

        describe('getRetrieveUrl', function () {
            it('should generate retrieve url for article when loation is article', function () {
                assert.equal(fromState.getRetrieveUrl({
                    url: 'http://api',
                    domains: {
                        article: 'insb'
                    },
                    userInterface: {
                        location: 'article'
                    },
                    searchResult: {
                        article: {
                            byId: {
                                1: {
                                    dbId: 'dbId',
                                    an: 'an'
                                }
                            }
                        }
                    }
                }, 1), 'http://api/insb/article/retrieve/dbId/an');
            });

            it('should generate retrieve url for publication when location is publication', function () {
                assert.equal(fromState.getRetrieveUrl({
                    url: 'http://api',
                    domains: {
                        publication: 'insb'
                    },
                    userInterface: {
                        location: 'publication'
                    },
                    searchResult: {
                        publication: {
                            byId: {
                                1: {
                                    publicationId: 'publicationId'
                                }
                            }
                        }
                    }
                }, 1), 'http://api/insb/publication/retrieve/publicationId');
            });

            it('should generate retrieve url for a2z when location is a2z', function () {
                assert.equal(fromState.getRetrieveUrl({
                    url: 'http://api',
                    domains: {
                        a2z: 'insb'
                    },
                    userInterface: {
                        location: 'a2z'
                    },
                    searchResult: {
                        a2z: {
                            byId: {
                                1: {
                                    publicationId: 'publicationId'
                                }
                            }
                        }
                    }
                }, 1), 'http://api/insb/publication/retrieve/publicationId');
            });
        });

        describe('getLocation', function () {
            it('should return userInterface.location', function () {
                assert.equal(fromState.getLocation({
                    userInterface: { location: 'article' }
                }), 'article');
            });
        });
    });
});
