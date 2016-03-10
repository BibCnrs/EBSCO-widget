import nightwatch from 'nightwatch';
import reducers from '../../lib/reducers';
import { assert } from 'chai';

before(function (done) {
    this.timeout(20000);
    global.assert = assert;
    global.reducers = reducers;
    global.defaultState = {
        ...reducers({}, {}),
        url: 'http://server'
    };

    global.client = nightwatch.initClient({
        silent: true,
        src_folders: ['./test/e2e'],
        custom_commands_path: './test/e2e/command',
        custom_assertions_path: './test/e2e/assertion',
        selenium_host: 'hub',
        desiredCapabilities: {
            browserName: 'chrome'
        },
        launch_url: 'http://app'
    });

    global.browser = global.client.api();
    global.browser
    .url(browser.launch_url)
    .waitForElementVisible('body', 1000);
    global.client.start(done);
});

after(function (done) {
    global.browser.end();
    global.client.start(done);
});
