import nightwatch from 'nightwatch';
import { assert } from 'chai';

before(function (done) {
    this.timeout(20000);
    global.assert = assert;

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
    .url(global.browser.launch_url);

    global.client.start(done);
});

beforeEach(function (done) {
    this.timeout(20000);
    global.browser
    .url(global.browser.launch_url)
    .waitForElementVisible('.ebsco-widget', 1000);

    global.client.start(done);
});

afterEach(function (done) {
    global.browser.end();
    global.client.start(done);
});

after(function () {
    global.client.terminate();
});
