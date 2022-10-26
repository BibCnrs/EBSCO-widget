import initialState from './profile.json';
import initialStateNotLogged from './profileNotLogged.json';
import initialStateInistAccount from './profileInistAccount.json';

describe('profile', function() {
    beforeEach(function(done) {
        browser.pause(1000).loadState(initialState);

        client.start(done);
    });

    it('should allow to add resource from databases', function(done) {
        browser
            .waitForElementVisible('.nav-db', 1000)
            .click('.nav-db')
            .pause(300)
            .waitForElementVisible('.databases', 2000)
            .assert.containsText('.databases .db .title', 'Test add')
            .click('.letter_t .bookmark-button')
            .pause(1000)
            .waitForElementVisible('.profile-button', 1000)
            .click('.profile-button')
            .waitForElementVisible('.favourite-resource__list', 1000)
            .assert.containsText(
                '.favourite-resource__item:nth-child(1)',
                'Test add',
            )
            .assert.containsText(
                '.favourite-resource__item:nth-child(2)',
                '.Test : CNRS',
            )
            .assert.containsText(
                '.favourite-resource__item:nth-child(3)',
                'Wikipedia',
            )
            .assert.containsText(
                '.favourite-resource__item:nth-child(4)',
                'google',
            )
            .assert.containsText(
                '.favourite-resource__item:nth-child(5)',
                'bibcnrs',
            )
            .end();

        client.start(done);
    });

    it('should allow to add resource from publication', function(done) {
        browser
            .waitForElementVisible('.nav-publication', 1000)
            .click('.nav-publication')
            .pause(300)
            .waitForElementVisible('.record_list', 1000)
            .assert.containsText(
                '.record_list .record .fetch-link',
                'The hitchhiker guide to the galaxy',
            )
            .click('.bookmark-button')
            .pause(1000)
            .waitForElementVisible('.profile-button', 1000)
            .click('.profile-button')
            .waitForElementVisible('.favourite-resource__list', 1000)
            .assert.containsText(
                '.favourite-resource__item:nth-child(1)',
                'The hitchhiker guide to the galaxy',
            )
            .assert.containsText(
                '.favourite-resource__item:nth-child(2)',
                '.Test : CNRS',
            )
            .assert.containsText(
                '.favourite-resource__item:nth-child(3)',
                'Wikipedia',
            )
            .assert.containsText(
                '.favourite-resource__item:nth-child(4)',
                'google',
            )
            .assert.containsText(
                '.favourite-resource__item:nth-child(5)',
                'bibcnrs',
            )
            .end();

        client.start(done);
    });

    it('clicking on bookmark button should remove an alredy added resources', function(done) {
        browser
            .waitForElementVisible('.nav-db', 1000)
            .click('.nav-db')
            .pause(300)
            .waitForElementVisible('.databases', 2000)
            .assert.containsText('.databases .letter_w .db .title', 'Wikipedia')
            .click('.letter_w .bookmark-button')
            .pause(1000)
            .waitForElementVisible('.profile', 1000)
            .waitForElementVisible('.favourite-resource__list', 1000)
            .assert.containsText(
                '.favourite-resource__item:nth-child(1)',
                '.Test : CNRS',
            )
            .assert.containsText(
                '.favourite-resource__item:nth-child(2)',
                'google',
            )
            .assert.containsText(
                '.favourite-resource__item:nth-child(3)',
                'bibcnrs',
            )
            .end();

        client.start(done);
    });

    it('should hide profile and bookmark button when not logged', function(done) {
        browser
            .loadState(initialStateNotLogged)
            .assert.elementCount('.profile', 0)
            .end();

        client.start(done);
    });

    it('should hide profile and bookmark button when logged with inist account', function(done) {
        browser
            .loadState(initialStateInistAccount)
            .pause(300)
            .assert.elementCount('.profile', 0)
            .end();

        client.start(done);
    });
});
