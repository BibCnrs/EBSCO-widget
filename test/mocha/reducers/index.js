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

        describe('articleHasResult', function () {
            it('should return true if state.searchResult.article.byId has at least one key', function() {
                assert.isTrue(fromState.articleHasResult({
                    searchResult: {
                        article: {
                            byId: {
                                1: 'key'
                            }
                        }
                    }
                }));
            });

            it('should return false if state.searchResult.article.byId has no key', function() {
                assert.isFalse(fromState.articleHasResult({
                    searchResult: {
                        article: {
                            byId: {}
                        }
                    }
                }));
            });
        });

        describe('publicationHasResult', function () {
            it('should return true if state.searchResult.publication.byId has at least one key', function() {
                assert.isTrue(fromState.publicationHasResult({
                    searchResult: {
                        publication: {
                            byId: {
                                1: 'key'
                            }
                        }
                    }
                }));
            });

            it('should return false if state.searchResult.publication.byId has no key', function() {
                assert.isFalse(fromState.publicationHasResult({
                    searchResult: {
                        publication: {
                            byId: {}
                        }
                    }
                }));
            });
        });

        describe('getDomainChange', function() {
            it('should return domain to modify for each location', function () {
                const state = {
                    domains: {
                        article: 'IN2P3',
                        publication: 'IN2P3',
                        all: ['IN2P3', 'INSHS'],
                        available: ['IN2P3', 'INSHS'],
                        defaultDomain: 'INSHS'
                    }
                };

                assert.deepEqual(fromState.getDomainChange(state), {
                    article: 'INSHS',
                    publication: 'INSHS'
                });
            });

            it('should return undefined if no defaultDomain', function () {
                const state = {
                    domains: {
                        article: 'IN2P3',
                        publication: 'IN2P3',
                        all: ['IN2P3', 'INSHS'],
                        available: ['IN2P3', 'INSHS']
                    }
                };

                assert.deepEqual(fromState.getDomainChange(state), {
                    article: undefined,
                    publication: undefined
                });
            });

            it('should return undefined for article if defaultDomain is not available', function () {
                const state = {
                    domains: {
                        article: 'IN2P3',
                        publication: 'IN2P3',
                        all: ['IN2P3', 'INSHS'],
                        available: ['IN2P3'],
                        defaultDomain: 'INSHS'
                    }
                };

                assert.deepEqual(fromState.getDomainChange(state), {
                    article: undefined,
                    publication: 'INSHS'
                });
            });

            it('should return undefined for publication if defaultDomain is not in all', function () {
                const state = {
                    domains: {
                        article: 'IN2P3',
                        publication: 'IN2P3',
                        all: ['IN2P3'],
                        available: ['IN2P3', 'INSHS'],
                        defaultDomain: 'INSHS'
                    }
                };

                assert.deepEqual(fromState.getDomainChange(state), {
                    article: 'INSHS',
                    publication: undefined
                });
            });
        });

        describe('getDomainToUpdate', function () {
            it('should return domain same result as getDomainChange if no searchResult', function () {
                const state = {
                    searchResult: {
                        article: {
                            byId: {}
                        },
                        publication: {
                            byId: {}
                        }
                    },
                    domains: {
                        article: 'IN2P3',
                        publication: 'IN2P3',
                        all: ['IN2P3', 'INSHS'],
                        available: ['IN2P3', 'INSHS'],
                        defaultDomain: 'INSHS'
                    }
                };

                assert.deepEqual(fromState.getDomainToUpdate(state), fromState.getDomainChange(state));
            });

            it('should return undefined for article if article has searchResult', function () {
                const state = {
                    searchResult: {
                        article: {
                            byId: {
                                0: 'result'
                            }
                        },
                        publication: {
                            byId: {}
                        }
                    },
                    domains: {
                        article: 'IN2P3',
                        publication: 'IN2P3',
                        all: ['IN2P3', 'INSHS'],
                        available: ['IN2P3', 'INSHS'],
                        defaultDomain: 'INSHS'
                    }
                };

                assert.deepEqual(fromState.getDomainToUpdate(state), {
                    ...fromState.getDomainChange(state),
                    article: undefined
                });
            });

            it('should return undefined for publication if publication has searchResult', function () {
                const state = {
                    searchResult: {
                        article: {
                            byId: {}
                        },
                        publication: {
                            byId: {
                                0: 'result'
                            }
                        }
                    },
                    domains: {
                        article: 'IN2P3',
                        publication: 'IN2P3',
                        all: ['IN2P3', 'INSHS'],
                        available: ['IN2P3', 'INSHS'],
                        defaultDomain: 'INSHS'
                    }
                };

                assert.deepEqual(fromState.getDomainToUpdate(state), {
                    ...fromState.getDomainChange(state),
                    publication: undefined
                });
            });
        });
    });
});
