exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./src/basicTest_spec.js'],
  capabilities: {
        browserName: 'chrome'
  },
  jasmineNodeOpts: {
        // If true, display spec names.
        isVerbose: true,
        showColors: true
  }
};