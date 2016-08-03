import * as fromState from '../../../lib/reducers';

describe('index reducers', function () {

    describe('selector', function () {

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

        describe('getRisRequestForIds', function () {
            it('should return Ris request for given records', function () {
                assert.deepEqual(fromState.getRisRequestForIds({
                    searchResult: {
                        article: {
                            byId: {
                                1: { risLink: 'http://risLink.com/1' },
                                2: { risLink: 'http://risLink.com/2' },
                                3: { risLink: 'http://risLink.com/3' }
                            }
                        }
                    },
                    url: 'http://api',
                    userInterface: { location: 'article' }
                }, [1, 3]), {
                    url: 'http://api/retrieve_ris',
                    config: {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            links: [
                                'http://risLink.com/1',
                                'http://risLink.com/3'
                            ]
                        })
                    }
                });
            });
        });

        describe('isExportingNotice', function () {
            it('should return true if id is in noticeBeingExported', function () {
                assert.isTrue(fromState.isExportingNotice({
                    userInterface: {
                        noticeBeingExported: [1]
                    }
                }, 1));
            });

            it('should return false if id is not in noticeBeingExported', function () {
                assert.isFalse(fromState.isExportingNotice({
                    userInterface: {
                        noticeBeingExported: [1]
                    }
                }, 2));
            });
        });

        describe('isPageSelected', function () {
            it('should return true if currentPage is selected', function () {
                assert.isTrue(fromState.isPageSelected({
                    selectedRecord: {
                        article: [0, 1, 2, 3, 4, 5, 6]
                    },
                    searchResult: {
                        article: {
                            currentPage: 1,
                            1: [1, 2, 3, 4, 5]
                        }
                    },
                    userInterface: { location: 'article' }
                }, 1));
            });

            it('should return false if currentPage is only partially selected', function () {
                assert.isFalse(fromState.isPageSelected({
                    selectedRecord: {
                        article: [0, 2, 3]
                    },
                    searchResult: {
                        article: {
                            currentPage: 1,
                            1: [1, 2]
                        }
                    },
                    userInterface: { location: 'article' }
                }, 1));
            });

            it('should return false if currentPage is only partially selected', function () {
                assert.isFalse(fromState.isPageSelected({
                    selectedRecord: {
                        article: [2, 3]
                    },
                    searchResult: {
                        article: {
                            currentPage: 1,
                            1: [1, 2, 3]
                        }
                    },
                    userInterface: { location: 'article' }
                }, 1));
            });
        });
    });
});
