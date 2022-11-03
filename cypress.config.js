// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('cypress');

module.exports = defineConfig({
    video: false,
    e2e: {
        baseUrl: 'http://localhost:3001',
    },
});
