import { storage } from '../../../lib/middlewares/storage';
import {
    ARTICLE,
    DELETE_HISTORY,
    LOGIN_SUCCESS,
    LOGOUT
} from '../../../lib/actions';

const {
    SEARCH_SUCCESS,
    DOMAIN_CHANGE
} = ARTICLE;

describe('storage middleware', function () {
    let store, dispatchedAction, next, nextAction;
    const state = {
        article: {
            history: [
                {
                    queries: [
                        {
                            boolean: 'AND',
                            term: 'aids',
                            field: null,
                            key: 'initial'
                        }
                    ],
                    domain: 'INSB',
                    limiters:{
                        fullText: true,
                        publicationDate:{
                            from: null,
                            to: null
                        },
                        peerReviewedArticle: false
                    },activeFacets: {

                    },
                    totalHits: 493671
                }
            ]
        }
    };

    let sessionStorage = {};
    let localStorage = {};

    before(function () {
        window.sessionStorage = {
            setItem: (key, value) => sessionStorage[key] = value,
            removeItem: (key) => delete sessionStorage[key]
        };
        window.localStorage = {
            setItem: (key, value) => localStorage[key] = value,
            removeItem: (key) => delete localStorage[key]
        };
    });

    beforeEach(function () {
        dispatchedAction = [];
        store = {
            getState: function () {
                return state;
            }
        };
        nextAction = [];
        next = function (action) {
            nextAction.push(action);
        };
        sessionStorage = {};
        localStorage = {};
    });

    it('should save state.article.history in localStorage on DELETE_HISTORY AND ARTICLE_SEARCH_SUCCESS', function () {
        [ DELETE_HISTORY, SEARCH_SUCCESS ].map(type => {
            const action = { type };

            storage(store, next, action);
            assert.deepEqual(nextAction, [action]);
            assert.deepEqual(dispatchedAction, []);
            assert.deepEqual(localStorage, {
                EBSCO_WIDGET_history: JSON.stringify(state.article.history)
            });
            localStorage = {};
            nextAction = [];
            dispatchedAction = [];
        });
    });

    it('should save username domain and availableDomains in sessionStorage on LOGIN_SUCCESS', function () {
        const action = {
            type: LOGIN_SUCCESS,
            response: {
                username: 'john',
                domains: ['INSB', 'INSHS']
            }
        };

        storage(store, next, action);
        assert.deepEqual(nextAction, [action]);
        assert.deepEqual(dispatchedAction, []);
        assert.deepEqual(sessionStorage, {
            EBSCO_WIDGET_username: '"john"',
            EBSCO_WIDGET_domain: '"INSB"',
            EBSCO_WIDGET_availableDomains: '["INSB","INSHS"]'
        });
    });

    it('should remove username domain and availableDomains in sessionStorage on LOGOUT', function () {
        sessionStorage = {
            EBSCO_WIDGET_username: '"john"',
            EBSCO_WIDGET_domain: '"INSB"',
            EBSCO_WIDGET_availableDomains: '["INSB","INSHS"]'
        };

        const action = {
            type: LOGOUT
        };

        storage(store, next, action);
        assert.deepEqual(nextAction, [action]);
        assert.deepEqual(dispatchedAction, []);
        assert.deepEqual(sessionStorage, {});
    });

    it('should save action.domain in sessionStorage.domain on ARTICLE_DOMAIN_CHANGE', function () {
        sessionStorage = {
            EBSCO_WIDGET_username: '"john"',
            EBSCO_WIDGET_domain: '"INSB"',
            EBSCO_WIDGET_availableDomains: '["INSB","INSHS"]'
        };
        const action = {
            type: DOMAIN_CHANGE,
            domain: 'INSHS'
        };

        storage(store, next, action);
        assert.deepEqual(nextAction, [action]);
        assert.deepEqual(dispatchedAction, []);
        assert.deepEqual(sessionStorage, {
            EBSCO_WIDGET_username: '"john"',
            EBSCO_WIDGET_domain: '"INSHS"',
            EBSCO_WIDGET_availableDomains: '["INSB","INSHS"]'
        });
    });
});
