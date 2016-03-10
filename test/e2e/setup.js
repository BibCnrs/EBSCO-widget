import nightwatch from 'nightwatch';
import reducers from '../../lib/reducers';

before(function () {
    global.reducers = reducers;
    global.defaultState = {
        ...reducers({}, {}),
        url: 'http://server'
    };

    global.client = nightwatch.initClient({
        silent: true,
        src_folders: ['./test/e2e'],
        custom_commands_path : './test/e2e/command',
        selenium_host  : 'hub',
        desiredCapabilities: {
            browserName: 'chrome'
        },
        launch_url: 'http://app'
    });

    global.browser = global.client.api();
});

after(function (done) {
    global.browser.end();
    global.client.start(done);
});
