const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    supportFile: false,
    specPattern: 'tests/integration/**/*.spec.js',
  },
});
