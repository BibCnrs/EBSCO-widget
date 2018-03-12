import initialState from './profile.json';
import initialStateNotLogged from './profileNotLogged.json';
import initialStateInistAccount from './profileInistAccount.json';

describe('profile', function() {
    beforeEach(function(done) {
        browser.pause(1000).loadState(initialState);

        client.start(done);
    });

    it('should display favourite resources in profile', function(done) {
        browser
            .waitForElementVisible('.profile-button', 1000)
            .assert.containsText('.text', 'Developer marmelab')
            .click('.profile-button')
            .pause(300)
            .waitForElementVisible('.favourite-resource-list', 1000)
            .assert.containsText(
                '.favourite-resource-item:nth-child(1)',
                '.Test : CNRS',
            )
            .assert.containsText(
                '.favourite-resource-item:nth-child(2)',
                'Wikipedia',
            )
            .assert.containsText(
                '.favourite-resource-item:nth-child(3)',
                'google',
            )
            .assert.containsText(
                '.favourite-resource-item:nth-child(4)',
                'bibcnrs',
            );

        client.start(done);
    });

    it('should allow to add resource from databases', function(done) {
        browser
            .waitForElementVisible('.nav-db', 1000)
            .click('.nav-db')
            .click('.nav-db')
            .pause(300)
            .waitForElementVisible('.database', 2000)
            .assert.containsText('.database .db .title', 'Test add')
            .click('.bookmark-button')
            .pause(1000)
            .waitForElementVisible('.profile-button', 1000)
            .click('.profile-button')
            .waitForElementVisible('.favourite-resource-list', 1000)
            .assert.containsText(
                '.favourite-resource-item:nth-child(1)',
                'Test add',
            )
            .assert.containsText(
                '.favourite-resource-item:nth-child(2)',
                '.Test : CNRS',
            )
            .assert.containsText(
                '.favourite-resource-item:nth-child(3)',
                'Wikipedia',
            )
            .assert.containsText(
                '.favourite-resource-item:nth-child(4)',
                'google',
            )
            .assert.containsText(
                '.favourite-resource-item:nth-child(5)',
                'bibcnrs',
            );

        client.start(done);
    });

    it('should allow to add resource from publication', function(done) {
        browser
            .waitForElementVisible('.nav-publication', 1000)
            .click('.nav-publication')
            .click('.nav-publication')
            .pause(300)
            .waitForElementVisible('.record_list', 1000)
            .assert.containsText(
                '.record_list .record .fetch-link',
                'The hitchhiker guide to the galaxy',
            )
            .assert.containsText(
                '.record_list .record .fulltext-holding',
                "J'ai lu",
            )
            .click('.bookmark-button')
            .pause(1000)
            .waitForElementVisible('.profile-button', 1000)
            .click('.profile-button')
            .waitForElementVisible('.favourite-resource-list', 1000)
            .assert.containsText(
                '.favourite-resource-item:nth-child(1)',
                "The hitchhiker guide to the galaxy - J'ai lu",
            )
            .assert.containsText(
                '.favourite-resource-item:nth-child(2)',
                '.Test : CNRS',
            )
            .assert.containsText(
                '.favourite-resource-item:nth-child(3)',
                'Wikipedia',
            )
            .assert.containsText(
                '.favourite-resource-item:nth-child(4)',
                'google',
            )
            .assert.containsText(
                '.favourite-resource-item:nth-child(5)',
                'bibcnrs',
            );

        client.start(done);
    });

    it('should hide profile and bookmark button when not logged', function(done) {
        browser
            .loadState(initialStateNotLogged)
            .waitForElementVisible('.header', 1000)
            .assert.elementCount('.profile-button', 0)
            .waitForElementVisible('.nav-db', 1000)
            .click('.nav-db')
            .click('.nav-db')
            .pause(300)
            .waitForElementVisible('.database', 1000)
            .assert.elementCount('.bookmark-button', 0)
            .waitForElementVisible('.nav-publication', 1000)
            .click('.nav-publication')
            .pause(300)
            .waitForElementVisible('.record_list', 1000)
            .assert.elementCount('.bookmark-button', 0);

        client.start(done);
    });

    it('should hide profile and bookmark button when logged with inist account', function(done) {
        browser
            .loadState(initialStateInistAccount)
            .pause(300)
            .assert.elementCount('.profile-button', 0)
            .waitForElementVisible('.nav-db', 1000)
            .click('.nav-db')
            .pause(300)
            .waitForElementVisible('.database', 1000)
            .assert.elementCount('.bookmark-button', 0)
            .click('.nav-publication')
            .pause(300)
            .waitForElementVisible('.record_list', 1000)
            .assert.elementCount('.bookmark-button', 0);

        client.start(done);
    });
});
